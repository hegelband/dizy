import DependencyTree from "./helpers/DependencyTree.js";

class InvalidDIParent extends Error {
	constructor() {
		super("Invalid di parent. Parent must be an instance of DIContainer or it's derived class, null or undefined.");
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

// todo: DIContainer interface - not abstract class. For base constructors create AbstractDIContainer class.
class DIContainer {
	constructor(parent, classTreeList = []) {
		if (parent !== null && parent !== undefined && !(parent instanceof DIContainer)) {
			throw new InvalidDIParent();
		}
		if (!Array.isArray(classTreeList) || (classTreeList.length && classTreeList.find((clsTree) => !(clsTree instanceof DependencyTree)))) {
			throw new DIContainerClassTreeListInvalid();
		}
		this.classTreeList = classTreeList;
	}

	// _createInstance() { } // protected method

	hasInstance() {}

	getInstance() {}

	filterInstances() {}

	getParent() {}

	// eslint-disable-next-line no-unused-vars
	typeMatch(key, type) {
		// is DI object with key instance of type
	}
}

export default DIContainer;
