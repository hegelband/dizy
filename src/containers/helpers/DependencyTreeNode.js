import { parseType } from "../../../ReflectionJs/index.js";
import DIClazz from "../../DIClazz.js";

class DependencyTreeNode extends DIClazz {
    constructor(baseClazz, height, deps) {
        if (parseType(baseClazz) !== 'object' && !(baseClazz instanceof DIClazz)) {
            throw new Error("DependencyTreeNode 'baseClazz' is invalid. Constructor argument 'baseClazz' must be a DIClazz instance.");
        }
        if (parseType(height) !== 'number') {
            throw new Error(`DependencyTreeNode 'height' is invalid (type - ${parseType(height)}). Constructor argument 'height' must be a number`);
        }
        if (!Array.isArray(deps) || (deps.length && deps.find(d => !(d instanceof DependencyTreeNode)))) {
            throw new Error("DependencyTreeNode 'deps' is invalid. Constructor argument 'deps' must be an array of DependencyTreeNode instances.");
        }
        const {
            key,
            name,
            type,
            isClass,
            lifecycle,
            constructor,
        } = baseClazz;
        super(key, name, type, isClass, lifecycle, constructor);
        this.height = height;
        this.deps = deps;
    }
}

export default DependencyTreeNode;
