import { DIObjectLifecycle } from "../DIObjectConfig";
import ContainerHasClassWithInvalidLifecycle from "../errors/ContainerHasClassWithInvalidLifecycle";
import HasNoDIObjectWithKey from "../errors/HasNoDIObjectWithKey";
import SimpleContainer from "./SimpleContainer";

class SingletoneContainer extends SimpleContainer {
    constructor(parent, allClasses = []) {
        const classWithInvalidLifecycle = allClasses.find(cls => cls.lifecycle !== DIObjectLifecycle.Singletone);
        if (classWithInvalidLifecycle) {
            throw new ContainerHasClassWithInvalidLifecycle('Singletone', classWithInvalidLifecycle);
        }
        super(allClasses);
        this.#parent = parent;
    }

    #parent;
    #instances = new Map();

    #createInstance(clazz) {
        const instance = this._createInstance(clazz);
        return instance;
    }

    addInstance(key, instance) {
        this.#instances.set(key, instance);
    }

    getInstance(key) {
        const existed = this.#instances.get(key);
        if (existed) {
            return existed;
        }
        const clazz = this.allClasses.find(cls => cls.name === key);
        if (!clazz) {
            return undefined;
        }
        return this.#createInstance(clazz);
    }

    getParent() {
        return this.#parent;
    }
}

export default SingletoneContainer;

