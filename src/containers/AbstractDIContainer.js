import DIContainer from "./DIContainer.js";
import DependencyTree from "./helpers/DependencyTree.js";

/** Class representing an error thrown when parent container isn't an instance of AbstractDIContainer.
 * @class
 * @extends Error
 */
class InvalidDIParent extends Error {
	constructor() {
		super("Invalid di parent. Parent must be an instance of AbstractDIContainer or it's derived class, null or undefined.");
	}
}

/** Class representing an error thrown when DIContainer 'classTreeList' is invalid.
 * @class
 * @extends Error
 */
class DIContainerClassTreeListInvalid extends Error {
	constructor() {
		super(
			"DIContainer constructor's argument 'classTreeList' is invalid. " +
				"Argument 'classTreeList' must be an array of DependencyTree instances",
		);
	}
}

/** Abstract Class AbstractDIContainer
 * @abstract
 * @extends {DIContainer}
 * @property {DependencyTree[]} classTreeList
 */
class AbstractDIContainer extends DIContainer {
	/**
	 * @abstract
	 * @param {AbstractDIContainer} parent - parent container
	 * @param {DependencyTree[]} [classTreeList=[]] - list of di objects dependency tree
	 */
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
