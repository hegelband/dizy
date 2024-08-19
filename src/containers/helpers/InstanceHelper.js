import FunctionWrapper from "../../wrappers/FunctionWrapper.js";
// eslint-disable-next-line no-unused-vars
import DependencyTreeNode from "./DependencyTreeNode.js";

/** Supporting class for instances */
class InstanceHelper {
	/**
	 * @static
	 * @param {DependencyTreeNode} clazzTreeNode
	 * @param {any} argumentValues
	 * @returns {Object|FunctionWrapper}
	 */
	static createInstance(clazzTreeNode, argumentValues) {
		if (clazzTreeNode.isClass) {
			return new clazzTreeNode.type(...argumentValues);
		} else {
			return new FunctionWrapper(clazzTreeNode.type, argumentValues);
		}
	}
}

export default InstanceHelper;
