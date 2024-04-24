import DependencyTree from "./DependencyTree.js";
import DependencyTreeNode from "./DependencyTreeNode.js";

class DependencyTreeFactory {

    static createDependencyTree(baseClazz, allClasses) {
        const baseNode = new DependencyTreeNode({
            height: 0,
            ...baseClazz,
            deps: [],
        });
        DependencyTreeFactory.#buildDependencyTree(baseNode, allClasses);
        return new DependencyTree(baseNode);
    }

    static #addDependencyToNode(node, dep) {
        node.deps.push(dep);
    }

    static #buildDependencyTree(node, allClasses) {
        if (node.constructor.args.length > 0) {
            node.constructor.args.forEach((arg) => {
                const argClazz = allClasses.find(cls => cls.name === arg);
                const nextNode = new DependencyTreeNode({
                    height: node.height + 1,
                    ...argClazz,
                    deps: [],
                });
                DependencyTreeFactory.#addDependencyToNode(node, nextNode);
                DependencyTreeFactory.#buildDependencyTree(nextNode, allClasses);
            })
        } else {
            return node;
        }
    }
}

export default DependencyTreeFactory;
