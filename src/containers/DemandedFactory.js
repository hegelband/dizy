import { DIObjectLifecycle } from "../DIObjectConfig";
import ContainerHasClassWithInvalidLifecycle from "../errors/ContainerHasClassWithInvalidLifecycle";
import deepEqual from "../utils/deepEqual";
import InstanceHelper from "./helpers/InstanceHelper";

class DemandedFactory {
    constructor(parent, classTreeList = []) {
        const classWithInvalidLifecycle = classTreeList.find(cls => cls.baseNode.lifecycle !== DIObjectLifecycle.Demanded);
        if (classWithInvalidLifecycle) {
            throw new ContainerHasClassWithInvalidLifecycle('Demanded', classWithInvalidLifecycle);
        }
        this.classTreeList = classTreeList;
        this.#parent = parent;
    }

    #parent;

    #buildInstance(clazzTree) {
        const argumentValues = [];
        if (clazzTree.baseNode.constructor.args.length > 0) {
            clazzTree.baseNode.constructor.args.forEach((arg) => {
                const argClazz = this.getParent().classTreeList.find(clsTree => clsTree.baseNode.name === arg);
                const existedInstance = argClazz.baseNode.lifecycle !== DIObjectLifecycle.Demanded
                    ? this.getParent().getInstance(argClazz.baseNode.key)
                    : undefined;
                if (existedInstance) {
                    return argumentValues.push(existedInstance);
                }
                argumentValues.push(this.createInstance(argClazz));
            })
        }
        const instance = InstanceHelper.createInstance(clazzTree.baseNode, argumentValues);
        console.log(clazzTree.baseNode.name, 'new instance');
        return instance;
    }

    createInstance(key) { // create new instance and add it in Map
        const clazz = this.classTreeList.find(cls => deepEqual(Symbol.keyFor(cls.baseNode.key.key), Symbol.keyFor(key.key)));
        if (!clazz) {
            return undefined;
        }
        return this.#buildInstance(clazz);
    }

    getParent() {
        return this.#parent;
    }
}

export default DemandedFactory;