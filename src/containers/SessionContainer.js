import LifecycleEnum from "../constants/LifecycleEnum.js";
import ContainerHasClassWithInvalidLifecycle from "../errors/ContainerHasClassWithInvalidLifecycle.js";
// eslint-disable-next-line no-unused-vars
import FunctionWrapper from "../wrappers/FunctionWrapper.js";
// eslint-disable-next-line no-unused-vars
import ContextContainer from "./ContextContainer.js";
import SimpleContainer from "./SimpleContainer.js";
import DIObjectKey from "./helpers/DIObjectKey.js";
import InstancesMap from "./helpers/InstancesMap.js";

/** Class representing simple DI container with session lifecycle
 * @class
 * @extends SimpleContainer
 */
class SessionContainer extends SimpleContainer {
	/**
	 *
	 * @param {AbstractContextContainer} parent - parent container
	 * @param {DependencyTree[]} [classTreeList=[]] - list of di objects dependency tree
	 */
	constructor(parent, classTreeList = []) {
		super(parent, classTreeList);
		const classWithInvalidLifecycle = classTreeList.find((cls) => cls.baseNode.lifecycle.id !== LifecycleEnum.Session);
		if (classWithInvalidLifecycle) {
			throw new ContainerHasClassWithInvalidLifecycle("Session", classWithInvalidLifecycle);
		}
		this.#parent = parent;
		// this.#init();
	}

	#isReady = false;
	#parent;
	#instances = new InstancesMap();

	/** Creates instance of each di object in this container
	 * @public
	 */
	init() {
		// ToDo logs
		if (this.#isReady) return;
		this.classTreeList.forEach((cls) => {
			// if (this.#instances.has(cls.baseNode.key.key)) {
			//     return;
			// }
			if (this.#instances.has(cls.baseNode.key.key)) {
				return;
			}
			this.#buildInstance(cls);
		});
		this.#isReady = true;
	}

	/** Adds new di object
	 * @public
	 * @param {DependencyTree} diObjectClazzTree
	 */
	addDIObject(diObjectClazzTree) {
		if (diObjectClazzTree.baseNode.lifecycle.id !== LifecycleEnum.Session) {
			throw new ContainerHasClassWithInvalidLifecycle("Session", diObjectClazzTree);
		}
		super.addDIObject(diObjectClazzTree);
		this.init();
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
		if (
			!this.classTreeList.find((clsTree) => {
				// console.log(clsTree.baseNode.key, key);
				return clsTree.baseNode.key.key === key.key;
			})
		) {
			throw new Error(`ClassTree with key ${key.key} in '${this.getParent().name}/SessionContainer' not found.`);
		}
		this.#instances.set(key.key, instance);
	}

	/** Returns boolean indicating whether an element with the specified key exists or not.
	 *
	 * @param {DIObjectKey} key
	 * @returns {boolean}
	 */
	hasInstance(key) {
		if (!this.#isReady) return false;
		if (!(key instanceof DIObjectKey)) {
			throw new Error(`Invalid argument 'key'. Argument 'key' must be an instance of DIObjectKey.`);
		}
		return this.#instances.has(key.key);
	}

	/**
	 *
	 * @param {DIObjectKey} key
	 * @returns {Object|FunctionWrapper}
	 */
	getInstance(key) {
		// return this.#instances.get(key.key);
		if (!this.#isReady) return undefined;
		return this.#instances.get(key.key);
	}

	/** Returns context that's a parent container of this SessionContainer
	 *
	 * @returns {ContextContainer}
	 */
	getParent() {
		return this.#parent;
	}
}

export default SessionContainer;
