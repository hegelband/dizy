// eslint-disable-next-line no-unused-vars
import FunctionWrapper from "../wrappers/FunctionWrapper.js";
import AbstractContextContainer from "./AbstractContextContainer.js";
import AbstractDIContainer from "./AbstractDIContainer.js";
// eslint-disable-next-line no-unused-vars
import DependencyTree from "./helpers/DependencyTree.js";
import InstanceHelper from "./helpers/InstanceHelper.js";

class InvalidSimpleContainerParent extends Error {
	constructor() {
		super(
			"Invalid simple container parent. Parent must be an instance of AbstractContextContainer or it's derived class, null or undefined.",
		);
	}
}

/** Abstract Class representing a standard DI container (storage+factory)
 * @class
 * @abstract
 * @extends AbstractDIContainer
 */
class SimpleContainer extends AbstractDIContainer {
	/**
	 *
	 * @param {AbstractContextContainer} parent - parent container
	 * @param {DependencyTree[]} [classTreeList=[]] - list of di objects dependency tree
	 */
	constructor(parent, classTreeList = []) {
		if (!(parent instanceof AbstractContextContainer)) {
			throw new InvalidSimpleContainerParent();
		}
		super(parent, classTreeList);
	}

	/** Returns new instance of di object.
	 * @protected
	 * @param {*} clazzTree
	 * @returns {Object|FunctionWrapper}
	 */
	_buildInstance(clazzTree) {
		// create new instance and add it in Map
		// works
		// const groups = clazzTree.groupByHeight().reverse();
		// for (let i = 0; i < groups.length; i++) {
		//     for (let j = 0; j < groups[i].deps.length; j++) {
		//         const clazz = groups[i].deps[j];
		//         const argumentValues = [];
		//         clazz.deps.forEach((dependency) => {
		//             if (dependency.lifecycle.id !== LifecycleEnum.Demanded) {
		//                 argumentValues.push(this.getInstance(dependency.name) || this.getParent().getInstance(dependency.name));
		//             } else {
		//                 argumentValues.push(this.getParent().getInstance(dependency.name, dependency.lifecycle.id, true));
		//             }
		//         });
		//         if (clazz.lifecycle.id !== LifecycleEnum.Demanded) {
		//             const instance = InstanceHelper.createInstance(groups[i].deps[j], argumentValues);
		//             if (clazzTree.baseNode.lifecycle.id !== groups[i].deps[j].lifecycle.id) {
		//                 this.getParent().getScope(groups[i].deps[j].lifecycle.id)._addInstance(groups[i].deps[j].key, instance);
		//             } else {
		//                 this._addInstance(groups[i].deps[j].key, instance);
		//             }
		//         }
		//     }
		// }
		// return this.getInstance(clazzTree.baseNode.name);

		const argumentValues = [];
		if (clazzTree.baseNode.constructor.args.length > 0) {
			clazzTree.baseNode.constructor.args.forEach((arg) => {
				const argClazz = this.getParent().classTreeList.find((clsTree) => clsTree.baseNode.name === arg);
				const existedInstance =
					this.getInstance(argClazz.baseNode.key) ||
					this.getParent().getInstance(argClazz.baseNode.name, argClazz.baseNode.lifecycle.id, true);
				if (existedInstance) {
					return argumentValues.push(existedInstance);
				}
				argumentValues.push(this._buildInstance(argClazz));
			});
		}
		const instance = InstanceHelper.createInstance(clazzTree.baseNode, argumentValues);
		this._addInstance(clazzTree.baseNode.key, instance);
		return instance;
	}

	/**
	 * @protected
	 */
	_addInstance() {}

	/** Push new di object in `classTreeList`
	 * @public
	 * @param {DependencyTree} diObjectClazzTree
	 */
	addDIObject(diObjectClazzTree) {
		this.classTreeList.push(diObjectClazzTree);
	}
}

export default SimpleContainer;
