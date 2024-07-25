import LifecycleEnum from "../constants/LifecycleEnum.js";
import ContainerHasClassWithInvalidLifecycle from "../errors/ContainerHasClassWithInvalidLifecycle.js";
import SimpleContainer from "./SimpleContainer.js";
import DIObjectKey from "./helpers/DIObjectKey.js";
import InstancesMap from "./helpers/InstancesMap.js";

class SingletoneContainer extends SimpleContainer {
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
		return this.#instances.has(key.key);
	}

	getInstance(key) {
		// const existed = this.#instances.getBySymbol(key.key);
		const existed = this.#instances.get(key.key);
		if (existed) {
			return existed;
		}
		// const clazz = this.classTreeList.find(cls => deepEqual(Symbol.keyFor(cls.baseNode.key.key), Symbol.keyFor(key.key)));
		const clazz = this.classTreeList.find((cls) => cls.baseNode.key.key === key.key);
		if (!clazz) {
			// console.log("nonono");
			return undefined;
		}
		return this.#buildInstance(clazz);
	}

	getParent() {
		return this.#parent;
	}
}

export default SingletoneContainer;
