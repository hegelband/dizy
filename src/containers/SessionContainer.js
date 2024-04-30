import LifecycleEnum from "../constants/LifecycleEnum.js";
import ContainerHasClassWithInvalidLifecycle from "../errors/ContainerHasClassWithInvalidLifecycle.js";
import SimpleContainer from "./SimpleContainer.js";
import InstancesMap from "./helpers/InstancesMap.js";

class SessionContainer extends SimpleContainer {
    constructor(parent, classTreeList = []) {
        super(parent, classTreeList);
        const classWithInvalidLifecycle = classTreeList.find(cls => cls.baseNode.lifecycle.id !== LifecycleEnum.Session);
        if (classWithInvalidLifecycle) {
            throw new ContainerHasClassWithInvalidLifecycle('Session', classWithInvalidLifecycle);
        }
        this.#parent = parent;
        // this.#init();
    }

    #parent;
    #instances = new InstancesMap();

    init() {
        // ToDo logs
        this.classTreeList.forEach(cls => {
            // if (this.#instances.hasBySymbol(cls.baseNode.key.key)) {
            //     return;
            // }
            if (this.#instances.has(cls.baseNode.key.key)) {
                return;
            }
            this.#buildInstance(cls);
        });
    }

    #buildInstance(clazz) {
        clazz.baseNode.lifecycle.beforeCreate();
        const instance = this._buildInstance(clazz);
        clazz.baseNode.lifecycle.afterCreate.bind(instance)();
        return instance;
    }

    addInstance(key, instance) {
        this.#instances.set(key.key, instance);
    }

    getInstance(key) {
        // return this.#instances.getBySymbol(key.key);
        return this.#instances.get(key.key);
    }

    getParent() {
        return this.#parent;
    }
}

export default SessionContainer;