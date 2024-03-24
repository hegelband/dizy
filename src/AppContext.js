import getClassConstructorArgsNames from "./utils/getClassConstructorArgsNames.js";
import getFunctionArgsNames from "./utils/getFunctionArgsNames.js";
import parseType from "./utils/parseType.js";
import { DIObjectLifecycle } from './DIObjectConfig.js';
import getArgumentDefaultValue from "./utils/getArgumentDefaultValue.js";

class InvalidDIObjectArgumentName extends Error {
    constructor(type, argName) {
        const message = `Invalid argument name { ${argName} } in ${type}. There is no object with name { ${argName} } in DI Container.`
        super(message);
        this.name = 'Invalid DI Object arg name error.';
    }
}

class InvalidDIObjectArgDefaultValue extends Error {
    constructor(type, argName, defaultValue) {
        const message = `Invalid argument { ${argName} } default value in ${type}. There is no { ${defaultValue} } in DI Container.`
        super(message);
        this.name = 'Invalid DI Object arg default value error.';
    }
}

class DependencyLoopError extends Error {
    constructor(first, second) {
        const message = `${first} requires ${second}. And ${second} requires ${first}.`;
        super(message);
        this.name = 'Dependency loop error.';
    }
}

class AppContext {
    constructor(config = {}, name = '', parent) {
        this.config = config;
        this.name = name;
        this.#parent = parent;
    }

    #contextReady = false;
    #parent;
    allClasses = [];
    sessionScope = new Map();
    singletoneScope = new Map();

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
        this.#initSessionScope();
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
            this.allClasses.push({
                name: containerObject.name,
                type: containerObject.type,
                isClass: typeOfContainerObject === 'class',
                lifecycle: containerObject.lifecycle,
                constructor,
            });
            // ToDo Все объекты с наименованиями объявленными в аргументах containerObject находятся в контейнере
            // ToDo Отсутствие циклических зависимостей
            // ToDo Правила жизненных циклов
            // Построение дерева зависимостей
        });
    }

    #initSessionScope() {
        // ToDo logs
        this.allClasses.filter(cls => cls.lifecycle === DIObjectLifecycle.Session).forEach(cls => {
            if (this.sessionScope.has(cls.name)) {
                // return this.sessionScope.get(cls.name);
                return;
            }
            const instance = this.createInstance(cls);
            if (instance !== null) {
                this.sessionScope.set(cls.name, instance);
            }
        });
        console.log(this.sessionScope.values());
    }

    #createSingletone(key) {

    }

    createInstance(clazz) {
        const argumentValues = [];
        if (clazz.constructor.args.length > 0) {
            clazz.constructor.args.forEach((arg) => {
                const argClazz = this.allClasses.find(cls => cls.name === arg);

                argumentValues.push(this.createInstance(argClazz));
            })
        }
        let instance;
        if (clazz.isClass) {
            instance = new clazz.type(...argumentValues);
        } else {
            instance = new FunctionWrapper(clazz.type, argumentValues);
        }
        return instance;
    }

    hasDIObject(key) {

    }

    hasDIObject(key, lifecycle) {

    }

    getDIObject(key) {

    }

    getDIObject(key, lifecycle) {

    }

    filterDIObjects(callback) {
        // Returns DI objects that meet the condition specified in a callback function.
    }

    typeMatch(key, type) {
        // is DI object with key instance of type
    }

    getParentContext() {
        return this.#parent;
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
        if (argName === undefined) argName = this.allClasses[0].name;
        if (this.allClasses.length === 0) return;
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

class FunctionWrapper {
    constructor(func, args) {
        this.func = func;
        this.args = args;
        console.log('Func with args ', func, args);
    }

    call() {
        this.func(...args);
    }
}

export default AppContext;
