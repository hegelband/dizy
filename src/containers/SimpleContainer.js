import { DIObjectLifecycle } from "../DIObjectConfig";
import DIContainer from "./DIContainer";
import InstanceHelper from "./helpers/InstanceHelper";

class SimpleContainer extends DIContainer {
    constructor(classTreeList = []) {
        super(classTreeList);
    }

    _buildInstance(clazzTree) { // create new instance and add it in Map
        // works
        // const groups = clazzTree.groupByHeight().reverse();
        // for (let i = 0; i < groups.length; i++) {
        //     for (let j = 0; j < groups[i].deps.length; j++) {
        //         const clazz = groups[i].deps[j];
        //         const argumentValues = [];
        //         clazz.deps.forEach((dependency) => {
        //             if (dependency.lifecycle !== DIObjectLifecycle.Demanded) {
        //                 argumentValues.push(this.getInstance(dependency.name) || this.getParent().getInstance(dependency.name));
        //             } else {
        //                 argumentValues.push(this.getParent().getInstance(dependency.name));
        //             }
        //         });
        //         if (clazz.lifecycle !== DIObjectLifecycle.Demanded) {
        //             const instance = InstanceHelper.createInstance(groups[i].deps[j], argumentValues);
        //             if (clazzTree.baseNode.lifecycle !== groups[i].deps[j].lifecycle) {
        //                 this.getParent().getScope(groups[i].deps[j].lifecycle).addInstance(groups[i].deps[j].name, instance);
        //             } else {
        //                 this.addInstance(groups[i].deps[j].name, instance);
        //             }
        //         }
        //     }
        // }
        // return this.getInstance(clazzTree.baseNode.name);

        const argumentValues = [];
        if (clazzTree.baseNode.constructor.args.length > 0) {
            clazzTree.baseNode.constructor.args.forEach((arg) => {
                const argClazz = this.getParent().classTreeList.find(clsTree => clsTree.baseNode.name === arg);
                const existedInstance = this.getInstance(argClazz.baseNode.key) || this.getParent().getInstance(argClazz.baseNode.name);
                if (existedInstance) {
                    return argumentValues.push(existedInstance);
                }
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
