import getClassConstructorArgsNames from "../utils/getClassConstructorArgsNames.js";
import getFunctionArgsNames from "../utils/getFunctionArgsNames.js";
import parseType from "../utils/parseType.js";
import { DIObjectLifecycle } from '../DIObjectConfig.js';
import getArgumentDefaultValue from "../utils/getArgumentDefaultValue.js";
import DIContainer from "./DIContainer.js";
import DIClazz from "../DIClazz.js";
import FunctionWrapper from "../wrappers/FunctionWrapper.js";
import SessionContainer from "./SessionContainer.js";
import InvalidDIObjectArgDefaultValue from "../errors/InvalidDIObjectArgDefaultValue.js";
import InvalidDIObjectArgumentName from "../errors/InvalidDIObjectArgumentName.js";
import DependencyLoopError from "../errors/DependencyLoopError.js";
import HasNoDIObjectWithKey from "../errors/HasNoDIObjectWithKey.js";
import SingletoneContainer from "./SingletoneContainer.js";

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
        this.allClasses = [];
        this.#initClasses();
        this.#validateObjectsArgsNames();
        this.#validateDependencyGraph();
        this.allClasses.sort((a, b) => {
            return a.constructor.args.length - b.constructor.args.length;
        });
        this.#initScopes();
    }

    #initClasses() {
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
            this.allClasses.push(new DIClazz(
                containerObject.name,
                containerObject.type,
                typeOfContainerObject === 'class',
                containerObject.lifecycle,
                constructor,
            ));
            // ToDo Правила жизненных циклов
            // Построение дерева зависимостей
        });
    }

    #initScopes() {
        const scopesTypes = new Set(this.allClasses.map(cls => cls.lifecycle));
        scopesTypes.forEach(lifecycle => {
            switch (lifecycle) {
                case DIObjectLifecycle.Session:
                    this.scopes.set(lifecycle, new SessionContainer(this, this.filterClassesByLifecycle(DIObjectLifecycle.Session)));
                    console.log(this.scopes);
                    break;
                case DIObjectLifecycle.Singletone:
                    this.scopes.set(lifecycle, new SingletoneContainer(this, this.filterClassesByLifecycle(DIObjectLifecycle.Singletone)));
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
        const findCallback = typeof key !== 'string' ? ((cls) => cls.type.name === key.name) : ((cls) => cls.name === key);
        let clazz;
        if (lifecycle !== undefined) {
            clazz = [...this.allClasses].filter(cls => cls.lifecycle === lifecycle).find(findCallback);
        } else {
            // find first class by key in order from Persistent to Demanded
            clazz = [...this.allClasses].sort((a, b) => a.lifecycle - b.lifecycle).find(findCallback);
        }
        if (!clazz) {
            throw new HasNoDIObjectWithKey(typeof key !== 'string' ? key.name : key, this.name);
        }
        key = clazz.name;
        const scope = this.scopes.get(clazz.lifecycle);
        console.log(scope);
        if (!scope) return undefined;
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

    filterClassesByLifecycle(lifecycle) {
        return this.allClasses.filter(cls => cls.lifecycle === lifecycle);
    }

    #validateObjectsArgsNames() {
        const argsSet = new Set();
        this.allClasses.forEach((cls) => cls.constructor.args.forEach((arg) => argsSet.add({
            name: arg,
            place: cls.name,
        })));
        argsSet.forEach(arg => {
            const cls = this.allClasses.find(elem => elem.name === arg.name);
            if (cls === undefined) {
                throw new InvalidDIObjectArgumentName(arg.place, arg.name);
            }
        });
    }

    #validateDependencyGraph() {
        this.allClasses.forEach((cls) => {
            cls.constructor.args.forEach(arg => {
                this.#findDependencyLoop([cls.name, arg], arg);
            });
        });
        return true;
    }

    #findDependencyLoop(depsList = [], argName) {
        if (this.allClasses.length === 0) return;
        if (argName === undefined) argName = this.allClasses[0].name;
        const cls = this.allClasses.find(cls => cls.name === argName);
        cls.constructor.args.forEach(elem => {
            if (depsList.includes(elem)) {
                throw new DependencyLoopError(cls.name, elem);
            } else {
                this.#findDependencyLoop([...depsList, elem], elem);
            }
        });
    }
}

export default ContextContainer;
