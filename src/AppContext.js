import getClassConstructorArgsNames from "./utils/getClassConstructorArgsNames";
import getFunctionArgsNames from "./utils/getFunctionArgsNames";
import parseType from "./utils/parseType";

class AppContext {
    constructor(config = {}) {
        this.config = config;
    }

    #contextReady = false;
    allClasses = [];
    sessionScope = new Map();

    init() {
        if (this.#contextReady) return;
        this.#contextReady = true;
        this.allClasses = [];
        this.config.forEach(containerObject => {
            console.log(containerObject.type.toString())
            const typeOfContainerObject = parseType(containerObject.type);
            const containerObjectTypeStr = containerObject.type.toString();
            this.allClasses.push({
                name: containerObject.name,
                type: containerObject.type,
                isClass: typeOfContainerObject === 'class',
                constructor: typeOfContainerObject === 'class'
                    ? getClassConstructorArgsNames(containerObjectTypeStr)
                    : getFunctionArgsNames(containerObjectTypeStr),
            });
            // ToDo Все объекты с наименованиями объявленными в аргументах containerObject находятся в контейнере
            // ToDo Отсутствие циклических зависимостей
            // ToDo Правила жизненных циклов
            // Построение дерева зависимостей
        });
        this.allClasses.sort((a, b) => {
            return a.constructor.args.length - b.constructor.args.length;
        });
        this.allClasses.forEach((cls) => {
            this.createInstance(cls);
        });
    }

    createInstance(clazz) {
        if (this.sessionScope.has(clazz.name)) {
            return this.sessionScope.get(clazz.name);
        }
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
        this.sessionScope.set(clazz.name, instance);
        return instance;
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