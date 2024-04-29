import DIContainer from "./DIContainer.js";
import DIClazz from "../DIClazz.js";
import InvalidDIObjectArgDefaultValue from "../errors/InvalidDIObjectArgDefaultValue.js";
import InvalidDIObjectArgumentName from "../errors/InvalidDIObjectArgumentName.js";
import DependencyLoopError from "../errors/DependencyLoopError.js";
import HasNoDIObjectWithKey from "../errors/HasNoDIObjectWithKey.js";
import DependencyTreeFactory from "./helpers/DependencyTreeFactory.js";
import DIObjectKeyFactory from "./helpers/DIObjectKeyFactory.js";
import { getArgumentDefaultValue, getBaseClass, getClassConstructorArgsNames, getFunctionArgsNames, parseType } from "../../ReflectionJs/index.js";
import Lifecycle from "../lifecycle/Lifecycle.js";
import NotAllowedDIObjectType from "../errors/NotAllowDIObjectType.js";
import LifecycleEnum from "../constants/LifecycleEnum.js";
import { DIObjectConfig } from "../DIObjectConfig.js";

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

// class DIConfigHasObjectsWithRepeatedNames extends Error {
//     constructor(names, contextName) {
//         const message = `There are DI objects with the same names { ${names.join(', ')} } in ${contextName} context config.`;
//         super(message);
//         this.name = "DI Config has objects with repeated names";
//     }
// }

class DerivedClassConstructorArgsError extends Error {
    constructor(derivedClassName, baseClassName) {
        const message = `The number of constructor arguments in the derived class ${derivedClassName} must be >= than the number of
            constructor arguments of its base class ${baseClassName}.`;
        super(message);
        this.name = 'Derived class constructor args count error';
    }
}

class InvalidContextConfig extends Error {
    constructor() {
        super('Invalid context config. Config must be an array of DIObjectConfig instances');
    }
}

class InvalidContextParent extends Error {
    constructor() {
        super("Invalid context parent. Parent must be an instance of AbstractContextContainer or it's derived class, null or undefined.");
    }
}

class InvalidDIObjectKeyFactory extends Error {
    constructor() {
        super("Invalid context keyFactory. KeyFactory must be an instance of DIObjectKeyFactory or it's derived class");
    }
}

class AbstractContextContainer extends DIContainer {
    constructor(config = [], name = '', parent = null, keyFactory = new DIObjectKeyFactory()) {
        if (!Array.isArray(config) && config.filter(c => !(c instanceof DIObjectConfig))) {
            throw new InvalidContextConfig();
        }
        if (!(parent instanceof AbstractContextContainer) && parent !== null && parent !== undefined) {
            throw new InvalidContextParent();
        }
        if (!(keyFactory instanceof DIObjectKeyFactory)) {
            throw new InvalidDIObjectKeyFactory();
        }
        super([]);
        this.config = config;
        this.name = name;
        this.#parent = parent;
        this.#keyFactory = keyFactory;
    }

    #contextReady = false;
    #parent;
    #keyFactory;

    classTreeList = [];

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
        this._createScopes();
        this._initScopes();
        this.#contextReady = true;
    }

    #initClasses() {
        const allConfigs = this.config.map(containerObject => {
            console.log(containerObject.type.toString());
            const objName = typeof containerObject.name === 'symbol' ? Symbol.keyFor(containerObject.name) : containerObject.name;
            const typeOfContainerObject = parseType(containerObject.type);
            if (typeOfContainerObject !== 'class' && typeOfContainerObject !== 'function') throw new NotAllowedDIObjectType(containerObject.type);
            const isClass = typeOfContainerObject === 'class';
            const constructorArgs = typeOfContainerObject === 'class'
                ? getClassConstructorArgsNames(containerObject.type)
                : getFunctionArgsNames(containerObject.type);
            const constructor = {
                ...constructorArgs,
                args: constructorArgs.args.map((arg) => {
                    const defaultValue = getArgumentDefaultValue(arg);
                    if (defaultValue && defaultValue.value) {
                        console.log(defaultValue);
                        const obj = this.config.find(cls => cls.type.name === defaultValue.value);
                        if (!obj) {
                            console.log(containerObject)
                            throw new InvalidDIObjectArgDefaultValue(containerObject.name, defaultValue.name, defaultValue.value);
                        }
                        return typeof obj.name === 'symbol' ? Symbol.keyFor(obj.name) : obj.name;
                    }
                    return arg;
                })
            };
            return new DIClazz(
                this.#keyFactory.createKey(this, objName, containerObject.lifecycle, isClass),
                objName,
                containerObject.type,
                isClass,
                containerObject.lifecycle,
                constructor,
            );
            // ToDo Правила жизненных циклов
        });
        allConfigs.forEach((clazz) => {
            // console.log(clazz.name);
            this.classTreeList.push(
                DependencyTreeFactory.createDependencyTree(
                    clazz,
                    allConfigs
                )
            );
        });
    }

    _createScopes() {

    }

    _initScopes() {

    }

    hasInstance(name, lifecycleId) {

    }

    getInstance(name, lifecycleId) {

    }

    _findClassTree(name, lifecycleId) {
        let findCallback;
        switch (typeof name) {
            case 'string':
                findCallback = ((cls) => cls.baseNode.name === name);
                break;
            case 'symbol':
                findCallback = ((cls) => cls.baseNode.name === Symbol.keyFor(name));
                break;
            default:
                findCallback = ((cls) => cls.baseNode.type.name === name.name);
                break;
        }
        let clazz;
        if (lifecycleId !== undefined) {
            clazz = [...this.classTreeList].filter(cls => cls.baseNode.lifecycle.id === lifecycleId).find(findCallback);
        } else {
            // find first class by key in order from Persistent to Demanded
            clazz = [...this.classTreeList].sort((a, b) => a.baseNode.lifecycle.id - b.baseNode.lifecycle.id).find(findCallback);
        }
        if (!clazz) {
            throw new HasNoDIObjectWithKey(typeof name !== 'string' ? name.name : name, this.name);
        }
        return clazz;
    }

    typeMatch(key, type) {
        // is DI object with key instance of type
    }

    getParent() {
        return this.#parent;
    }

    getScope(lifecycleId) {

    }

    filterClassesByLifecycle(lifecycleId) {
        return this.classTreeList.filter(cls => cls.baseNode.lifecycle.id === lifecycleId);
    }

    #validateDIConfig() {
        // Check if there are objects with invalid name
        // !name !== true || typeof name === 'string'
        const objectWithInvalidName = this.config.find(({ name }) => !name === true || !(typeof name === 'string' || typeof name === 'symbol'));
        if (objectWithInvalidName) {
            throw new DIObjectHasInvalidName(objectWithInvalidName.name, this.name);
        }
        // Accept repeated names *
        // Check if there are objects with the same names
        // const configSet = new Set(this.config.map((objectConfig) => objectConfig.name));
        // if (this.config.length !== configSet.size) {
        //     const objectsByNames = Object.fromEntries(Array.from(configSet.values()).map(key => ([
        //         key,
        //         this.config.filter((objectConfig) => objectConfig.name === key),
        //     ])));
        //     const objectsWithRepeatedNames = Object.entries(objectsByNames).filter(([name, items]) => items.length > 1);
        //     throw new DIConfigHasObjectsWithRepeatedNames(objectsWithRepeatedNames.map(obj => obj[0]), this.name);
        // }
        // Check object lifecycle
        // Change this conditions after Lifecycle class will be defined.
        const objectWithInvalidLifecycle = this.config.find(({ lifecycle }) => {
            return !(lifecycle instanceof Lifecycle)
                || !Object.values(LifecycleEnum).find(v => v === lifecycle.id);
        });
        if (objectWithInvalidLifecycle) {
            throw new DIObjectHasInvalidLifecycleIdentifier(objectWithInvalidLifecycle.lifecycle.id, this.name);
        }
        // Check Inheritance Hierarchy
        // this.config.forEach((clazz) => this.#validateInheritanceHierarchy(clazz.type));
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

    #validateInheritanceHierarchy(clazz) {
        // check inheritance existence
        // if base class exist and it is not an Object Class,
        //    check if base class is a part of this di context
        //      check if constructor arguments count <= derived class constructor args count and return to beggining, otherwise throw an exception
        // else return true
        if (parseType(clazz) !== 'class') return true;
        const baseClass = getBaseClass(clazz);
        const isAnotherDIObject = this.config.findIndex(objConfig => objConfig.type.name === baseClass.name) !== -1;
        console.log(clazz.name, baseClass.name, isAnotherDIObject)
        if (baseClass.name !== 'Object') {
            if (isAnotherDIObject) {
                const clsConstructorArgs = getClassConstructorArgsNames(clazz).args;
                const baseClsConstructorArgs = getClassConstructorArgsNames(baseClass).args;
                if (clsConstructorArgs.length < baseClsConstructorArgs.length) {
                    throw new DerivedClassConstructorArgsError(clazz.name, baseClass.name);
                }
            }
            return this.#validateInheritanceHierarchy(baseClass);
        } else {
            return true;
        }
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

export default AbstractContextContainer;
