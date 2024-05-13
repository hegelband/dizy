import DIClazz from "../../DIClazz.js";
import DependencyTree from "./DependencyTree.js";
import DependencyTreeNode from "./DependencyTreeNode.js";

class InvalidBaseClazz extends Error {
	constructor() {
		super("Argument 'baseClazz' is invalid. 'baseClazz' must be an instance of DIClazz");
		this.name = "DependencyTreeFactory.createDependencyTree() Error";
	}
}

class InvalidAllClasses extends Error {
	constructor() {
		super("Argument 'allClasses' is invalid. 'allClasses' must be a not empty array of DIClazz instances");
		this.name = "DependencyTreeFactory.createDependencyTree() Error";
	}
}

class DependencyTreeFactory {
	static createDependencyTree(baseClazz, allClasses) {
		if (!(baseClazz instanceof DIClazz)) {
			throw new InvalidBaseClazz();
		}
		if (
			!Array.isArray(allClasses) ||
			(allClasses.length && allClasses.findIndex((cls) => !(cls instanceof DIClazz)) !== -1) ||
			!allClasses.length
		) {
			throw new InvalidAllClasses();
		}
		const baseNode = new DependencyTreeNode(baseClazz, 0, []);
		DependencyTreeFactory.#buildDependencyTree(baseNode, allClasses);
		return new DependencyTree(baseNode);
	}

	static #addDependencyToNode(node, dep) {
		node.deps.push(dep);
	}

	static #buildDependencyTree(node, allClasses) {
		if (node.constructor.args.length > 0) {
			node.constructor.args.forEach((arg) => {
				const argClazz = allClasses.find((cls) => cls.name === arg);
				const nextNode = new DependencyTreeNode(argClazz, node.height + 1, []);
				DependencyTreeFactory.#addDependencyToNode(node, nextNode);
				DependencyTreeFactory.#buildDependencyTree(nextNode, allClasses);
			});
		} else {
			return node;
		}
	}
}

export default DependencyTreeFactory;
