import FunctionWrapper from "../../wrappers/FunctionWrapper.js";

class InstanceHelper {
	static createInstance(clazzTreeNode, argumentValues) {
		if (clazzTreeNode.isClass) {
			return new clazzTreeNode.type(...argumentValues);
		} else {
			return new FunctionWrapper(clazzTreeNode.type, argumentValues);
		}
	}
}

export default InstanceHelper;
