import DIClazz from "../DIClazz";

class DependencyTreeNode extends DIClazz {
    constructor({
        name,
        type,
        isClass,
        lifecycle,
        constructor,
        height,
        deps
    }) {
        super(name, type, isClass, lifecycle, constructor);
        this.height = height;
        this.deps = deps;
    }
}

export default DependencyTreeNode;
