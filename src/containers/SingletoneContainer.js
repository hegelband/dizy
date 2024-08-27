import LifecycleEnum from "../constants/LifecycleEnum.js";
import ContainerHasClassWithInvalidLifecycle from "../errors/ContainerHasClassWithInvalidLifecycle.js";
import SimpleContainer from "./SimpleContainer.js";
import DIObjectKey from "./helpers/DIObjectKey.js";
import InstancesMap from "./helpers/InstancesMap.js";

/** Class representing simple DI container with singletone lifecycle
 * @class
 * @extends SimpleContainer
 */
class SingletoneContainer extends SimpleContainer {
	/**
	 *
	 * @param {AbstractContextContainer} parent - parent container
	 * @param {DependencyTree[]} [classTreeList=[]] - list of di objects dependency tree
	 */
	constructor(parent, classTreeList = []) {
		super(parent, classTreeList);
		const classWithInvalidLifecycle = classTreeList.find((cls) => cls.baseNode.lifecycle.id !== LifecycleEnum.Singletone);
		if (classWithInvalidLifecycle) {
			throw new ContainerHasClassWithInvalidLifecycle("Singletone", classWithInvalidLifecycle);
		}
		this.#parent = parent;
	}

	#parent;
	#instances = new InstancesMap();

	/** Adds new di object
	 * @public
	 * @param {DependencyTree} diObjectClazzTree
	 */
	addDIObject(diObjectClazzTree) {
		if (diObjectClazzTree.baseNode.lifecycle.id !== LifecycleEnum.Singletone) {
			throw new ContainerHasClassWithInvalidLifecycle("Singletone", diObjectClazzTree);
		}
		super.addDIObject(diObjectClazzTree);
	}

	#buildInstance(clazz) {
		clazz.baseNode.lifecycle.beforeCreate();
		const instance = this._buildInstance(clazz);
		clazz.baseNode.lifecycle.afterCreate.bind(instance)();
		return instance;
	}

	/** Adds instance to instancesMap
	 * @protected
	 * @param {DIObjectKey} key
	 * @param {Object|FunctionWrapper} instance
	 */
	_addInstance(key, instance) {
		// check that key is valid (there is a classTree node with that key)
		if (!(key instanceof DIObjectKey)) {
			throw new Error(`Invalid key type. Argument 'key' must be an instance of DIObjectKey class.`);
		}
		// delete this rule, because we need to access adding instance from outside
		// don't delete this rule, because we don't need to do ServiceLocator
		if (
			!this.classTreeList.find((clsTree) => {
				// console.log(clsTree.baseNode.key, key);
				return clsTree.baseNode.key.key === key.key;
			})
		) {
			throw new Error(`ClassTree with key ${key.key} in '${this.getParent().name}/SingletoneContainer' not found.`);
		}
		this.#instances.set(key.key, instance);
	}

	/** Returns boolean indicating whether an element with the specified key exists or not.
	 *
	 * @param {DIObjectKey} key
	 * @returns {boolean}
	 */
	hasInstance(key) {
		return this.#instances.has(key.key);
	}

	/**
	 *
	 * @param {DIObjectKey} key
	 * @returns {Object|FunctionWrapper}
	 */
	getInstance(key) {
		// const existed = this.#instances.get(key.key);
		const existed = this.#instances.get(key.key);
		if (existed) {
			return existed;
		}
		// const clazz = this.classTreeList.find(cls => deepEqual(Symbol.keyFor(cls.baseNode.key.key), Symbol.keyFor(key.key)));
		const clazz = this.classTreeList.find((cls) => cls.baseNode.key.key === key.key);
		if (!clazz) {
			return undefined;
		}
		return this.#buildInstance(clazz);
	}

	/** Returns context that's a parent container of this SessionContainer
	 *
	 * @returns {ContextContainer}
	 */
	getParent() {
		return this.#parent;
	}
}

export default SingletoneContainer;
