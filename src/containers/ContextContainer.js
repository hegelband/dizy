import getClassConstructorArgsNames from "../utils/getClassConstructorArgsNames.js";
import getFunctionArgsNames from "../utils/getFunctionArgsNames.js";
import parseType from "../utils/parseType.js";
import { DIObjectLifecycle } from '../DIObjectConfig.js';
import getArgumentDefaultValue from "../utils/getArgumentDefaultValue.js";
import DIContainer from "./DIContainer.js";
import DIClazz from "../DIClazz.js";
import SessionContainer from "./SessionContainer.js";
import InvalidDIObjectArgDefaultValue from "../errors/InvalidDIObjectArgDefaultValue.js";
import InvalidDIObjectArgumentName from "../errors/InvalidDIObjectArgumentName.js";
import DependencyLoopError from "../errors/DependencyLoopError.js";
import HasNoDIObjectWithKey from "../errors/HasNoDIObjectWithKey.js";
import SingletoneContainer from "./SingletoneContainer.js";
import DependencyTreeFactory from "../utils/DependencyTreeFactory.js";
import DemandedFactory from "./DemandedFactory.js";

class ContextContainer extends DIContainer {
    constructor(config = {}, name = '', parent) {
        super([]);
        this.config = config;
        this.name = name;
        this.#parent = parent;
    }

    #contextReady = false;
    #parent;

    scopes = new Map();

    init() {
        if (this.#contextReady) return;
        this.#contextReady = true;
        this.classTreeList = [];
        this.#initClasses();
        this.#validateObjectsArgsNames();
        this.#validateDependencyGraph();
        this.classTreeList.sort((a, b) => {
            return a.baseNode.constructor.args.length - b.baseNode.constructor.args.length;
        });
        this.#initScopes();
    }

    #initClasses() {
        const allConfigs = [];
        this.config.forEach(containerObject => {
            console.log(containerObject.type.toString());
            const typeOfContainerObject = parseType(containerObject.type);
            const containerObjectTypeStr = containerObject.type.toString();
            const constructorArgs = typeOfContainerObject === 'class'
                ? getClassConstructorArgsNames(containerObjectTypeStr)
                : getFunctionArgsNames(containerObjectTypeStr);
            const constructor = {
                ...constructorArgs,
                args: constructorArgs.args.map((arg) => {
                    const defaultValue = getArgumentDefaultValue(arg);
                    if (defaultValue) {
                        const obj = this.config.find(cls => cls.type.name === defaultValue.value);
                        if (!obj) {
                            throw new InvalidDIObjectArgDefaultValue(containerObject.name, defaultValue.name, defaultValue.value);
                        }
                        return obj.name;
                    }
                    return arg;
                })
            };
            allConfigs.push(
                new DIClazz(
                    containerObject.name,
                    containerObject.type,
                    typeOfContainerObject === 'class',
                    containerObject.lifecycle,
                    constructor,
                )
            );
            // ToDo Правила жизненных циклов
            // Построение дерева зависимостей
        });
        allConfigs.forEach((clazz) => {
            this.classTreeList.push(
                DependencyTreeFactory.createDependencyTree(
                    clazz,
                    allConfigs
                )
            );
        })
        console.log(this.classTreeList);
        console.log(this.classTreeList[3].groupByHeight());
    }

    #initScopes() {
        const scopesTypes = new Set(this.classTreeList.map(cls => cls.baseNode.lifecycle));
        scopesTypes.forEach(lifecycle => {
            switch (lifecycle) {
                case DIObjectLifecycle.Session:
                    this.scopes.set(lifecycle, new SessionContainer(this, this.filterClassesByLifecycle(DIObjectLifecycle.Session)));
                    console.log(this.scopes);
                    break;
                case DIObjectLifecycle.Singletone:
                    this.scopes.set(lifecycle, new SingletoneContainer(this, this.filterClassesByLifecycle(DIObjectLifecycle.Singletone)));
                    break;
                case DIObjectLifecycle.Demanded:
                    this.scopes.set(lifecycle, new DemandedFactory(this, this.filterClassesByLifecycle(DIObjectLifecycle.Demanded)));
                    break;
                default:
                    break;
            }
        });
    }

    hasInstance(key, lifecycle) {
        if (lifecycle !== undefined) {

        }
    }

    getInstance(key, lifecycle) {
        const findCallback = typeof key !== 'string' ? ((cls) => cls.baseNode.type.name === key.name) : ((cls) => cls.baseNode.name === key);
        let clazz;
        if (lifecycle !== undefined) {
            clazz = [...this.classTreeList].filter(cls => cls.baseNode.lifecycle === lifecycle).find(findCallback);
        } else {
            // find first class by key in order from Persistent to Demanded
            clazz = [...this.classTreeList].sort((a, b) => a.baseNode.lifecycle - b.baseNode.lifecycle).find(findCallback);
        }
        if (!clazz) {
            throw new HasNoDIObjectWithKey(typeof key !== 'string' ? key.name : key, this.name);
        }
        key = clazz.baseNode.name;
        const scope = this.scopes.get(clazz.baseNode.lifecycle);
        console.log(scope);
        if (!scope) return undefined;
        if (scope instanceof DemandedFactory) return scope.createInstance(key);
        return scope.getInstance(key);
    }

    filterInstances(callback) {
        // Returns DI objects that meet the condition specified in a callback function.
    }

    typeMatch(key, type) {
        // is DI object with key instance of type
    }

    getParent() {
        return this.#parent;
    }

    getScope(lifecycle) {
        if (typeof lifecycle !== 'number' || lifecycle < 0 || lifecycle > 4) {
            return null;
        }
        return this.scopes.get(lifecycle);
    }

    filterClassesByLifecycle(lifecycle) {
        return this.classTreeList.filter(cls => cls.baseNode.lifecycle === lifecycle);
    }

    #validateObjectsArgsNames() {
        const argsSet = new Set();
        this.classTreeList.forEach((cls) => cls.baseNode.constructor.args.forEach((arg) => argsSet.add({
            name: arg,
            place: cls.baseNode.name,
        })));
        argsSet.forEach(arg => {
            const cls = this.classTreeList.find(elem => elem.baseNode.name === arg.name);
            if (cls === undefined) {
                throw new InvalidDIObjectArgumentName(arg.place, arg.name);
            }
        });
    }

    #validateDependencyGraph() {
        this.classTreeList.forEach((cls) => {
            cls.baseNode.constructor.args.forEach(arg => {
                this.#findDependencyLoop([cls.baseNode.name, arg], arg);
            });
        });
        return true;
    }

    #findDependencyLoop(depsList = [], argName) {
        if (this.classTreeList.length === 0) return;
        if (argName === undefined) argName = this.classTreeList[0].baseNode.name;
        const cls = this.classTreeList.find(cls => cls.baseNode.name === argName);
        cls.baseNode.constructor.args.forEach(elem => {
            if (depsList.includes(elem)) {
                throw new DependencyLoopError(cls.baseNode.name, elem);
            } else {
                this.#findDependencyLoop([...depsList, elem], elem);
            }
        });
    }
}

export default ContextContainer;
