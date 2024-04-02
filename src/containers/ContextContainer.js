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
import DIObjectKeyFactory from "./helpers/DIObjectKeyFactory.js";

class DIObjectHasInvalidName extends Error {
    constructor(name, contextName) {
        const message = `DI Object has invalid name { ${name} }. Rename this DI object in ${contextName} context config.`;
        super(message);
        this.name = "DI Object's name is invalid";
    }
}

class DIObjectHasInvalidLifecycleIdentifier extends Error {
    constructor(lifecycleId, contextName) {
        const message = `DI Object has invalid lifecycle identifier { ${lifecycleId} }. Change this DI object in ${contextName} context config.`;
        super(message);
        this.name = "DI Object's lifecycle identifier is invalid";
    }
}

class DIConfigHasObjectsWithRepeatedNames extends Error {
    constructor(names, contextName) {
        const message = `There are DI objects with the same names { ${names.join(', ')} } in ${contextName} context config.`;
        super(message);
        this.name = "DI Config has objects with repeated names";
    }
}

class ContextContainer extends DIContainer {
    constructor(config = [], name = '', parent, keyFactory = new DIObjectKeyFactory()) {
        super([]);
        this.config = config;
        this.name = name;
        this.#parent = parent;
        this.#keyFactory = keyFactory;
    }

    #contextReady = false;
    #parent;
    #keyFactory;

    scopes = new Map();

    init() {
        this.#validateDIConfig();
        if (this.#contextReady) return;
        this.classTreeList = [];
        this.#initClasses();
        this.#validateObjectsArgsNames();
        this.#validateDependencyGraph();
        this.classTreeList.sort((a, b) => {
            return a.baseNode.constructor.args.length - b.baseNode.constructor.args.length;
        });
        this.#initScopes();
        this.#contextReady = true;
    }

    #initClasses() {
        const allConfigs = [];
        this.config.forEach(containerObject => {
            console.log(containerObject.type.toString());
            const typeOfContainerObject = parseType(containerObject.type);
            const isClass = typeOfContainerObject === 'class';
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
                    this.#keyFactory.createKey(this, containerObject.name, containerObject.lifecycle, isClass),
                    containerObject.name,
                    containerObject.type,
                    isClass,
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
        });
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

    hasInstance(name, lifecycle) {
        const classTree = this.#findClassTree(name, lifecycle);
        const scope = this.scopes.get(classTree.baseNode.lifecycle);
        if (classTree.baseNode.lifecycle === DIObjectLifecycle.Demanded) return false;
        if (scope.getInstance(classTree.baseNode.key)) return true;
    }

    getInstance(name, lifecycle) {
        const clazz = this.#findClassTree(name, lifecycle);
        const key = clazz.baseNode.key;
        const scope = this.scopes.get(clazz.baseNode.lifecycle);
        console.log(scope);
        if (!scope) return undefined;
        if (scope instanceof DemandedFactory) return scope.createInstance(key);
        return scope.getInstance(key);
    }

    #findClassTree(name, lifecycle) {
        const findCallback = typeof name !== 'string' ? ((cls) => cls.baseNode.type.name === name.name) : ((cls) => cls.baseNode.name === name);
        let clazz;
        if (lifecycle !== undefined) {
            clazz = [...this.classTreeList].filter(cls => cls.baseNode.lifecycle === lifecycle).find(findCallback);
        } else {
            // find first class by key in order from Persistent to Demanded
            clazz = [...this.classTreeList].sort((a, b) => a.baseNode.lifecycle - b.baseNode.lifecycle).find(findCallback);
        }
        if (!clazz) {
            throw new HasNoDIObjectWithKey(typeof name !== 'string' ? name.name : name, this.name);
        }
        return clazz;
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
        if (typeof lifecycle !== 'number' || lifecycle < 0 || lifecycle > 3) {
            return null;
        }
        return this.scopes.get(lifecycle);
    }

    filterClassesByLifecycle(lifecycle) {
        return this.classTreeList.filter(cls => cls.baseNode.lifecycle === lifecycle);
    }

    #validateDIConfig() {
        // Check if there are objects with invalid name
        // !name !== true || typeof name === 'string'
        const objectWithInvalidName = this.config.find(({ name }) => !name === true || typeof name !== 'string');
        if (objectWithInvalidName) {
            throw new DIObjectHasInvalidName(objectWithInvalidName.name, this.name);
        }
        // Accept repeated names *
        // Check if there are objects with the same names
        const configSet = new Set(this.config.map((objectConfig) => objectConfig.name));
        if (this.config.length !== configSet.size) {
            const objectsByNames = Object.fromEntries(Array.from(configSet.values()).map(key => ([
                key,
                this.config.filter((objectConfig) => objectConfig.name === key),
            ])));
            const objectsWithRepeatedNames = Object.entries(objectsByNames).filter(([name, items]) => items.length > 1);
            throw new DIConfigHasObjectsWithRepeatedNames(objectsWithRepeatedNames.map(obj => obj[0]), this.name);
        }
        // Check object lifecycle
        // Change this conditions after Lifecycle class will be defined.
        const objectWithInvalidLifecycle = this.config.find(({ lifecycle }) => typeof lifecycle !== 'number' || lifecycle < 0 || lifecycle > 3);
        if (objectWithInvalidLifecycle) {
            throw new DIObjectHasInvalidLifecycleIdentifier(objectWithInvalidLifecycle.lifecycle, this.name);
        }
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
