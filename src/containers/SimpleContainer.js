import { DIObjectLifecycle } from "../DIObjectConfig";
import FunctionWrapper from "../wrappers/FunctionWrapper";
import DIContainer from "./DIContainer";

class SimpleContainer extends DIContainer {
    constructor(allClasses = []) {
        super(allClasses);
    }

    _createInstance(clazz) { // create new instance and add it in Map
        const argumentValues = [];
        if (clazz.constructor.args.length > 0) {
            clazz.constructor.args.forEach((arg) => {
                const argClazz = this.getParent().allClasses.find(cls => cls.name === arg);
                const existedInstance = this.getInstance(argClazz.name) || this.getParent().getInstance(argClazz.name);
                if (existedInstance) {
                    return argumentValues.push(existedInstance);
                }
                argumentValues.push(this._createInstance(argClazz));
            })
        }
        let instance;
        if (clazz.isClass) {
            instance = new clazz.type(...argumentValues);
        } else {
            instance = new FunctionWrapper(clazz.type, argumentValues);
        }
        console.log(clazz.name, 'new instance');
        this.addInstance(clazz.name, instance);
        return instance;
    }

    addInstance() { }
}

export default SimpleContainer;
