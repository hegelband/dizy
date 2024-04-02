import { DIObjectLifecycle } from "../DIObjectConfig";
import ContainerHasClassWithInvalidLifecycle from "../errors/ContainerHasClassWithInvalidLifecycle";
import SimpleContainer from "./SimpleContainer";
import InstancesMap from "./helpers/InstancesMap";

class PersistentContainer extends SimpleContainer {
    constructor(parent, classTreeList = []) {
        const classWithInvalidLifecycle = classTreeList.find(cls => cls.baseNode.lifecycle !== DIObjectLifecycle.Session);
        if (classWithInvalidLifecycle) {
            throw new ContainerHasClassWithInvalidLifecycle('Session', classWithInvalidLifecycle);
        }
        super(classTreeList);
        this.#parent = parent;
        this.#init();
    }

    #parent;
    #instances = new InstancesMap();

    #init() {
        // ToDo logs
        this.classTreeList.forEach(cls => {
            if (this.#instances.hasBySymbol(cls.baseNode.key.key)) {
                return;
            }
            this.#buildInstance(cls);
        });
    }

    #buildInstance(clazz) {
        const instance = this._buildInstance(clazz);
        return instance;
    }

    addInstance(key, instance) {
        this.#instances.set(key.key, instance);
    }

    getInstance(key) {
        return this.#instances.getBySymbol(key.key);
    }

    getParent() {
        return this.#parent;
    }
}

export default PersistentContainer;