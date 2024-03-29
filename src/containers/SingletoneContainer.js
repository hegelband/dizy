import { DIObjectLifecycle } from "../DIObjectConfig";
import ContainerHasClassWithInvalidLifecycle from "../errors/ContainerHasClassWithInvalidLifecycle";
import HasNoDIObjectWithKey from "../errors/HasNoDIObjectWithKey";
import SimpleContainer from "./SimpleContainer";

class SingletoneContainer extends SimpleContainer {
    constructor(parent, classTreeList = []) {
        const classWithInvalidLifecycle = classTreeList.find(cls => cls.baseNode.lifecycle !== DIObjectLifecycle.Singletone);
        if (classWithInvalidLifecycle) {
            throw new ContainerHasClassWithInvalidLifecycle('Singletone', classWithInvalidLifecycle);
        }
        super(classTreeList);
        this.#parent = parent;
    }

    #parent;
    #instances = new Map();

    #buildInstance(clazz) {
        const instance = this._buildInstance(clazz);
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
        const clazz = this.classTreeList.find(cls => cls.baseNode.name === key);
        if (!clazz) {
            return undefined;
        }
        return this.#buildInstance(clazz);
    }

    getParent() {
        return this.#parent;
    }
}

export default SingletoneContainer;

