import { DIObjectLifecycle } from "../../DIObjectConfig";
import FunctionWrapper from "../../wrappers/FunctionWrapper";

function createInstance(clazz) {
    const argumentValues = [];
    if (clazz.constructor.args.length > 0) {
        clazz.constructor.args.forEach((arg) => {
            const argClazz = this.allClasses.find(cls => cls.name === arg);
            if (argClazz.lifecycle <= DIObjectLifecycle.Singletone) {
                const existedInstance = this.getParent().getInstance(argClazz.name);
                if (existedInstance) {
                    return argumentValues.push(existedInstance);
                }
            }

            argumentValues.push(createInstance(argClazz));
        })
    }
    let instance;
    if (clazz.isClass) {
        instance = new clazz.type(...argumentValues);
    } else {
        instance = new FunctionWrapper(clazz.type, argumentValues);
    }
    return instance;
};

export default createInstance;
