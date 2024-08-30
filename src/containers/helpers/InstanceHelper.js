// eslint-disable-next-line no-unused-vars
import DependencyTreeNode from "./DependencyTreeNode.js";

/** Supporting class for instances */
class InstanceHelper {
	/**
	 * @static
	 * @param {DependencyTreeNode} clazzTreeNode
	 * @param {any} argumentValues
	 * @returns {Object|Function}
	 */
	static createInstance(clazzTreeNode, argumentValues) {
		if (clazzTreeNode.isClass) {
			return new clazzTreeNode.type(...argumentValues);
		} else {
			return new Proxy(clazzTreeNode.type, {
				apply(target) {
					return target(...argumentValues);
				},
				construct(target) {
					return new target(...argumentValues);
				},
			});
		}
	}
}

export default InstanceHelper;
