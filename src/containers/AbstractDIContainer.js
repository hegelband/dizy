import DIContainer from "./DIContainer.js";
import DependencyTree from "./helpers/DependencyTree.js";

class InvalidDIParent extends Error {
	constructor() {
		super("Invalid di parent. Parent must be an instance of AbstractDIContainer or it's derived class, null or undefined.");
	}
}

class DIContainerClassTreeListInvalid extends Error {
	constructor() {
		super(
			"DIContainer constructor's argument 'classTreeList' is invalid. " +
				"Argument 'classTreeList' must be an array of DependencyTree instances",
		);
	}
}

class AbstractDIContainer extends DIContainer {
	constructor(parent, classTreeList = []) {
		if (parent !== null && parent !== undefined && !(parent instanceof AbstractDIContainer)) {
			throw new InvalidDIParent();
		}
		if (!Array.isArray(classTreeList) || (classTreeList.length && classTreeList.find((clsTree) => !(clsTree instanceof DependencyTree)))) {
			throw new DIContainerClassTreeListInvalid();
		}
		super();
		this.classTreeList = classTreeList;
	}
}

export default AbstractDIContainer;
