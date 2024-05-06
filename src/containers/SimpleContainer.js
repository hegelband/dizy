import LifecycleEnum from "../constants/LifecycleEnum.js";
import AbstractContextContainer from "./AbstractContextContainer.js";
import DIContainer from "./DIContainer.js";
import InstanceHelper from "./helpers/InstanceHelper.js";

class InvalidSimpleContainerParent extends Error {
    constructor() {
        super("Invalid simple container parent. Parent must be an instance of AbstractContextContainer or it's derived class, null or undefined.");
    }
}

class SimpleContainer extends DIContainer {
    constructor(parent, classTreeList = []) {
        if (!(parent instanceof AbstractContextContainer)) {
            throw new InvalidSimpleContainerParent();
        }
        super(parent, classTreeList);
    }

    _buildInstance(clazzTree) { // create new instance and add it in Map
        // works
        // const groups = clazzTree.groupByHeight().reverse();
        // for (let i = 0; i < groups.length; i++) {
        //     for (let j = 0; j < groups[i].deps.length; j++) {
        //         const clazz = groups[i].deps[j];
        //         const argumentValues = [];
        //         clazz.deps.forEach((dependency) => {
        //             if (dependency.lifecycle.id !== LifecycleEnum.Demanded) {
        //                 argumentValues.push(this.getInstance(dependency.name) || this.getParent().getInstance(dependency.name));
        //             } else {
        //                 argumentValues.push(this.getParent().getInstance(dependency.name, dependency.lifecycle.id, true));
        //             }
        //         });
        //         if (clazz.lifecycle.id !== LifecycleEnum.Demanded) {
        //             const instance = InstanceHelper.createInstance(groups[i].deps[j], argumentValues);
        //             if (clazzTree.baseNode.lifecycle.id !== groups[i].deps[j].lifecycle.id) {
        //                 this.getParent().getScope(groups[i].deps[j].lifecycle.id).addInstance(groups[i].deps[j].key, instance);
        //             } else {
        //                 this.addInstance(groups[i].deps[j].key, instance);
        //             }
        //         }
        //     }
        // }
        // return this.getInstance(clazzTree.baseNode.name);

        const argumentValues = [];
        if (clazzTree.baseNode.constructor.args.length > 0) {
            clazzTree.baseNode.constructor.args.forEach((arg) => {
                const argClazz = this.getParent().classTreeList.find(clsTree => clsTree.baseNode.name === arg);
                const existedInstance = this.getInstance(argClazz.baseNode.key)
                    || this.getParent().getInstance(argClazz.baseNode.name, argClazz.baseNode.lifecycle.id, true);
                if (existedInstance) {
                    return argumentValues.push(existedInstance);
                }
                console.log(argClazz.baseNode.name)
                argumentValues.push(this._buildInstance(argClazz));
            })
        }
        const instance = InstanceHelper.createInstance(clazzTree.baseNode, argumentValues);
        this.addInstance(clazzTree.baseNode.key, instance);
        return instance;
    }

    addInstance() { }
}

export default SimpleContainer;
