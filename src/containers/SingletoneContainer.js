import { DIObjectLifecycle } from "../DIObjectConfig";
import ContainerHasClassWithInvalidLifecycle from "../errors/ContainerHasClassWithInvalidLifecycle";
import deepEqual from "../utils/deepEqual";
import SimpleContainer from "./SimpleContainer";
import InstancesMap from "./helpers/InstancesMap";

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
    #instances = new InstancesMap();

    #buildInstance(clazz) {
        const instance = this._buildInstance(clazz);
        return instance;
    }

    addInstance(key, instance) {
        this.#instances.set(key.key, instance);
    }

    getInstance(key) {
        console.log('key');
        // const existed = this.#instances.getBySymbol(key.key);
        const existed = this.#instances.get(key.key);
        if (existed) {
            return existed;
        }
        // const clazz = this.classTreeList.find(cls => deepEqual(Symbol.keyFor(cls.baseNode.key.key), Symbol.keyFor(key.key)));
        const clazz = this.classTreeList.find(cls => cls.baseNode.key.key === key.key);
        if (!clazz) {
            console.log('nonono')
            return undefined;
        }
        return this.#buildInstance(clazz);
    }

    getParent() {
        return this.#parent;
    }
}

export default SingletoneContainer;

