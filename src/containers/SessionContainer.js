import LifecycleEnum from "../constants/LifecycleEnum";
import ContainerHasClassWithInvalidLifecycle from "../errors/ContainerHasClassWithInvalidLifecycle";
import SimpleContainer from "./SimpleContainer";
import InstancesMap from "./helpers/InstancesMap";

class SessionContainer extends SimpleContainer {
    constructor(parent, classTreeList = []) {
        const classWithInvalidLifecycle = classTreeList.find(cls => cls.baseNode.lifecycle.id !== LifecycleEnum.Session);
        if (classWithInvalidLifecycle) {
            throw new ContainerHasClassWithInvalidLifecycle('Session', classWithInvalidLifecycle);
        }
        super(classTreeList);
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