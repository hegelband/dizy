import LifecycleEnum from "../constants/LifecycleEnum.js";
import ContainerHasClassWithInvalidLifecycle from "../errors/ContainerHasClassWithInvalidLifecycle.js";
import SimpleContainer from "./SimpleContainer.js";
import DIObjectKey from "./helpers/DIObjectKey.js";
import InstancesMap from "./helpers/InstancesMap.js";

class SessionContainer extends SimpleContainer {
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

	init() {
		// ToDo logs
		if (this.#isReady) return;
		this.classTreeList.forEach((cls) => {
			// if (this.#instances.hasBySymbol(cls.baseNode.key.key)) {
			//     return;
			// }
			if (this.#instances.has(cls.baseNode.key.key)) {
				return;
			}
			this.#buildInstance(cls);
		});
		this.#isReady = true;
	}

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

	addInstance(key, instance) {
		// check that key is valid (there is a classTree node with that key)
		if (!(key instanceof DIObjectKey)) {
			throw new Error(`Invalid key type. Argument 'key' must be an instance of DIObjectKey class.`);
		}
		// delete this rule, because we need to access adding instance from outside
		// if (!this.classTreeList.find(clsTree => clsTree.baseNode.key.key === key.key)) {
		//     throw new Error(`ClassTree with key ${key.key} in '${this.getParent().name}/SingletoneContainer' not found.`);
		// }
		this.#instances.set(key.key, instance);
	}

	hasInstance(key) {
		if (!this.#isReady) return false;
		if (!(key instanceof DIObjectKey)) {
			throw new Error(`Invalid argument 'key'. Argument 'key' must be an instance of DIObjectKey.`);
		}
		return this.#instances.has(key.key);
	}

	getInstance(key) {
		// return this.#instances.getBySymbol(key.key);
		if (!this.#isReady) return undefined;
		return this.#instances.get(key.key);
	}

	getParent() {
		return this.#parent;
	}
}

export default SessionContainer;
