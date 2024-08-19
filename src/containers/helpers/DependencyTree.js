import { parseType } from "../../../ReflectionJs/index.js";
import DependencyTreeNode from "./DependencyTreeNode.js";

class BaseNodeInvalid extends Error {
	constructor() {
		super("DependencyTree baseNode arg is invalid. Constructor argument 'baseNode' must be an instance of DependencyTreeNode");
	}
}

/** Class representing a dependency tree
 * @class
 */
class DependencyTree {
	/**
	 * @param {DependencyTreeNode} baseNode
	 */
	constructor(baseNode) {
		if (!(baseNode instanceof DependencyTreeNode)) {
			throw new BaseNodeInvalid();
		}
		this.baseNode = baseNode;
	}

	#getDepsByHeight(height, node = this.baseNode) {
		const deps = [];
		if (node.height < height) {
			node.deps.forEach((dep) => {
				deps.push(...this.#getDepsByHeight(height, dep));
			});
		} else if (node.height === height) {
			deps.push(node);
		}
		return deps;
	}

	/** Returns all deps with specified height
	 *
	 * @param {number} height
	 * @returns {DependencyTreeNode[]}
	 */
	getDepsByHeight(height) {
		if (parseType(height) !== "number") {
			throw new Error("getDepsByHeight arg 'height' is undefined. Argument 'height' value must be a positive number");
		}
		if (height < 0) {
			throw new Error("getDepsByHeight arg 'height' is a negative number. Argument 'height' value must be a positive number");
		}
		return this.#getDepsByHeight(height);
	}

	/**
	 * @typedef {Object} nodesGroupType
	 * @property {number} height
	 * @property {DependencyTreeNode[]} deps
	 */

	/** Returns nodes grouped by height
	 *
	 * @returns {nodesGroupType[]}
	 */
	groupByHeight() {
		let currentHeight = 0;
		const groups = [];
		let currentDeps = this.getDepsByHeight(currentHeight);
		while (currentDeps && currentDeps.length > 0) {
			groups.push({
				height: currentHeight,
				deps: currentDeps,
			});
			currentHeight++;
			currentDeps = this.getDepsByHeight(currentHeight);
		}
		return groups;
	}
}

export default DependencyTree;
