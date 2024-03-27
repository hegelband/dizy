import { DIObjectLifecycle } from "../DIObjectConfig";
import ContainerHasClassWithInvalidLifecycle from "../errors/ContainerHasClassWithInvalidLifecycle";
import SimpleContainer from "./SimpleContainer";

class SessionContainer extends SimpleContainer {
    constructor(parent, allClasses = []) {
        const classWithInvalidLifecycle = allClasses.find(cls => cls.lifecycle !== DIObjectLifecycle.Session);
        if (classWithInvalidLifecycle) {
            throw new ContainerHasClassWithInvalidLifecycle('Session', classWithInvalidLifecycle);
        }
        super(allClasses);
        this.#parent = parent;
        this.#init();
    }

    #parent;
    #instances = new Map();

    #init() {
        // ToDo logs
        this.allClasses.forEach(cls => {
            if (this.#instances.has(cls.name)) {
                return;
            }
            this.#createInstance(cls);
        });
    }

    #createInstance(clazz) {
        const instance = this._createInstance(clazz);
        return instance;
    }

    addInstance(key, instance) {
        this.#instances.set(key, instance);
    }

    getInstance(key) {
        return this.#instances.get(key);
    }

    getParent() {
        return this.#parent;
    }
}

export default SessionContainer;