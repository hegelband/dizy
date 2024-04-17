import DIClazz from "../DIClazz";

class DependencyTreeNode extends DIClazz {
    constructor({
        key,
        name,
        type,
        isClass,
        lifecycle,
        constructor,
        height,
        deps
    }) {
        super(key, name, type, isClass, lifecycle, constructor);
        this.height = height;
        this.deps = deps;
    }
}

export default DependencyTreeNode;
