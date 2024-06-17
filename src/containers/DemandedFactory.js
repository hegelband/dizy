import LifecycleEnum from "../constants/LifecycleEnum.js";
import ContainerHasClassWithInvalidLifecycle from "../errors/ContainerHasClassWithInvalidLifecycle.js";
// import deepEqual from "../utils/deepEqual.js";
import AbstractContextContainer from "./AbstractContextContainer.js";
import DependencyTree from "./helpers/DependencyTree.js";
import InstanceHelper from "./helpers/InstanceHelper.js";

class InvalidDemandedFactoryParent extends Error {
	constructor() {
		super(
			"Invalid demanded factory parent. " +
				"Parent must be an instance of AbstractContextContainer or it's derived class, null or undefined.",
		);
	}
}

class DemandedFactoryClassTreeListInvalid extends Error {
	constructor() {
		super(
			"DemandedFactory constructor's argument 'classTreeList' is invalid. " +
				"Argument 'classTreeList' must be an array of DependencyTree instances",
		);
	}
}

class DemandedFactory {
	constructor(parent, classTreeList = []) {
		if (!(parent instanceof AbstractContextContainer)) {
			throw new InvalidDemandedFactoryParent();
		}
		if (!Array.isArray(classTreeList) || (classTreeList.length && classTreeList.find((clsTree) => !(clsTree instanceof DependencyTree)))) {
			throw new DemandedFactoryClassTreeListInvalid();
		}
		const classWithInvalidLifecycle = classTreeList.find((cls) => cls.baseNode.lifecycle.id !== LifecycleEnum.Demanded);
		if (classWithInvalidLifecycle) {
			throw new ContainerHasClassWithInvalidLifecycle("Demanded", classWithInvalidLifecycle);
		}
		this.classTreeList = classTreeList;
		this.#parent = parent;
	}

	#parent;

	#buildInstance(clazzTree) {
		const argumentValues = [];
		if (clazzTree.baseNode.constructor.args.length > 0) {
			clazzTree.baseNode.constructor.args.forEach((arg) => {
				const argClazz = this.getParent().classTreeList.find((clsTree) => clsTree.baseNode.name === arg);
				const existedInstance =
					argClazz.baseNode.lifecycle.id !== LifecycleEnum.Demanded
						? this.getParent().getInstance(argClazz.baseNode.name, argClazz.baseNode.lifecycle.id, true)
						: undefined;
				if (existedInstance) {
					return argumentValues.push(existedInstance);
				}
				argumentValues.push(this.createInstance(argClazz.baseNode.key));
			});
		}
		clazzTree.baseNode.lifecycle.beforeCreate();
		const instance = InstanceHelper.createInstance(clazzTree.baseNode, argumentValues);
		// console.log(instance);
		clazzTree.baseNode.lifecycle.afterCreate.bind(instance)();
		// console.log(clazzTree.baseNode.name, "new instance");
		return instance;
	}

	createInstance(key) {
		// create new instance and add it in Map
		// console.log(key);
		// const clazz = this.classTreeList.find(cls => deepEqual(Symbol.keyFor(cls.baseNode.key.key), Symbol.keyFor(key.key)));
		const clazz = this.classTreeList.find((cls) => cls.baseNode.key.key === key.key);
		if (!clazz) {
			return undefined;
		}
		return this.#buildInstance(clazz);
	}

	getParent() {
		return this.#parent;
	}
}

export default DemandedFactory;
