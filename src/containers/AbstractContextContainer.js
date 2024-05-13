import {
	getArgumentDefaultValue,
	getBaseClass,
	getClassConstructorArgsNames,
	getFunctionArgsNames,
	parseType,
} from "../../ReflectionJs/index.js";
// eslint-disable-next-line no-unused-vars
import DIClazz from "../DIClazz.js";
import { DIObjectConfig } from "../DIObjectConfig.js";
import DependencyLoopError from "../errors/DependencyLoopError.js";
import InvalidDIObjectArgDefaultValue from "../errors/InvalidDIObjectArgDefaultValue.js";
import InvalidDIObjectArgumentName from "../errors/InvalidDIObjectArgumentName.js";
import NotAllowedDIObjectType from "../errors/NotAllowDIObjectType.js";
import DIContainer from "./DIContainer.js";
import DIObjectKeyFactory from "./helpers/DIObjectKeyFactory.js";
import DependencyTreeFactory from "./helpers/DependencyTreeFactory.js";

// class DIObjectHasInvalidName extends Error {
// 	constructor(name, contextName) {
// 		const message = `DI Object has invalid name { ${name} }. Rename this DI object in ${contextName} context config.`;
// 		super(message);
// 		this.name = "DI Object's name is invalid";
// 	}
// }

// class DIObjectHasInvalidLifecycleIdentifier extends Error {
// 	constructor(lifecycleId, contextName) {
// 		const message = `DI Object has invalid lifecycle identifier { ${lifecycleId} }. Change this DI object in ${contextName} context config.`;
// 		super(message);
// 		this.name = "DI Object's lifecycle identifier is invalid";
// 	}
// }

// class DIConfigHasObjectsWithRepeatedNames extends Error {
//     constructor(names, contextName) {
//         const message = `There are DI objects with the same names { ${names.join(', ')} } in ${contextName} context config.`;
//         super(message);
//         this.name = "DI Config has objects with repeated names";
//     }
// }

class DerivedClassConstructorArgsError extends Error {
	constructor(derivedClassName, baseClassName) {
		const message = `The number of constructor arguments in the derived class ${derivedClassName} must be >= than the number of
            constructor arguments of its base class ${baseClassName}.`;
		super(message);
		this.name = "Derived class constructor args count error";
	}
}

class InvalidContextConfig extends Error {
	constructor() {
		super("Invalid context config. Config must be an array of DIObjectConfig instances");
	}
}

class InvalidContextParent extends Error {
	constructor() {
		super("Invalid context parent. Parent must be an instance of AbstractContextContainer or it's derived class, null or undefined.");
	}
}

class InvalidDIObjectKeyFactory extends Error {
	constructor() {
		super("Invalid context keyFactory. KeyFactory must be an instance of DIObjectKeyFactory or it's derived class");
	}
}

class InvalidContextChild extends Error {
	constructor() {
		super("Invalid context child. Child must be an instance of AbstractContextContainer or it's derived class, null or undefined.");
	}
}

class AbstractContextContainer extends DIContainer {
	constructor(config = [], name = "", parent = null, keyFactory = new DIObjectKeyFactory()) {
		if (!Array.isArray(config) || config.find((c) => !(c instanceof DIObjectConfig))) {
			throw new InvalidContextConfig();
		}
		if (parent !== null && parent !== undefined && !(parent instanceof AbstractContextContainer)) {
			throw new InvalidContextParent();
		}
		if (!name) {
			throw new Error("Name of Context must be a non empty string.");
		}
		if (!(keyFactory instanceof DIObjectKeyFactory)) {
			throw new InvalidDIObjectKeyFactory();
		}
		super(parent, []);
		this.config = config;
		this.name = name;
		if (parent instanceof AbstractContextContainer) {
			if (parent.getChildren().has(this.name)) {
				throw new Error("Parent already has this context as a child.");
			}
			this.#parent = parent;
			parent._addChild(this);
		}
		this.#keyFactory = keyFactory;
	}

	#contextReady = false;
	#parent;
	#keyFactory;
	#clazzes = [];
	#children = new Map();

	classTreeList = [];

	scopes = new Map();

	init() {
		// this.#validateDIConfig();
		if (this.#contextReady) return;
		this.classTreeList = [];
		this.#initClazzes();
		this.#validateObjectsArgsNames();
		this.#validateDependencyGraph();
		this.#initClassTreeList();
		this.classTreeList.sort((a, b) => {
			return a.baseNode.constructor.args.length - b.baseNode.constructor.args.length;
		});
		this._createScopes();
		this._initScopes();
		this.#children.forEach((child) => {
			if (child.init) {
				child.init();
			}
		});
		this.#contextReady = true;
	}

	#initClazzes() {
		this.#clazzes = this.config.map((containerObject) => {
			console.log(containerObject.type.toString());
			const objName = typeof containerObject.name === "symbol" ? Symbol.keyFor(containerObject.name) : containerObject.name;
			const typeOfContainerObject = parseType(containerObject.type);
			if (typeOfContainerObject !== "class" && typeOfContainerObject !== "function" && typeOfContainerObject !== "function class") {
				throw new NotAllowedDIObjectType(containerObject.type);
			}
			const isClass = typeOfContainerObject === "class" || typeOfContainerObject === "function class";
			const constructorArgs =
				typeOfContainerObject === "class"
					? getClassConstructorArgsNames(containerObject.type)
					: getFunctionArgsNames(containerObject.type);
			const constructor = {
				...constructorArgs,
				args: constructorArgs.args.map((arg) => {
					const defaultValue = getArgumentDefaultValue(arg);
					if (defaultValue && defaultValue.value) {
						console.log(defaultValue);
						const obj = this.config.find((cls) => cls.type.name === defaultValue.value);
						if (!obj) {
							console.log(containerObject);
							throw new InvalidDIObjectArgDefaultValue(containerObject.name, defaultValue.name, defaultValue.value);
						}
						return typeof obj.name === "symbol" ? Symbol.keyFor(obj.name) : obj.name;
					}
					return arg;
				}),
			};
			return new DIClazz(
				this.#keyFactory.createKey(this, objName, containerObject.lifecycle, isClass),
				objName,
				containerObject.type,
				isClass,
				containerObject.lifecycle,
				constructor,
			);
			// ToDo Правила жизненных циклов
		});
	}

	#initClassTreeList() {
		this.classTreeList = this.#clazzes.map((clazz) => DependencyTreeFactory.createDependencyTree(clazz, this.#clazzes));
	}

	_createScopes() {}

	_initScopes() {}

	// eslint-disable-next-line no-unused-vars
	hasInstance(name) {}

	// eslint-disable-next-line no-unused-vars
	getInstance(name, lifecycleId) {}

	_findClassTree(name, lifecycleId) {
		let findCallback;
		switch (typeof name) {
			case "string":
				findCallback = (cls) => cls.baseNode.name === name;
				break;
			case "symbol":
				findCallback = (cls) => cls.baseNode.name === Symbol.keyFor(name);
				break;
			default:
				findCallback = (cls) => cls.baseNode.type.name === name.name;
				break;
		}
		let clazz;
		if (lifecycleId !== undefined) {
			clazz = [...this.classTreeList].filter((cls) => cls.baseNode.lifecycle.id === lifecycleId).find(findCallback);
		} else {
			// find first class by key in order from Persistent to Demanded
			clazz = [...this.classTreeList].sort((a, b) => a.baseNode.lifecycle.id - b.baseNode.lifecycle.id).find(findCallback);
		}
		if (!clazz) {
			return undefined;
			// throw new HasNoDIObjectWithKey(typeof name !== 'string' ? name.name : name, this.name);
		}
		return clazz;
	}

	// eslint-disable-next-line no-unused-vars
	typeMatch(key, type) {
		// is DI object with key instance of type
	}

	getParent() {
		return this.#parent;
	}

	_removeParent() {
		this.#parent = null;
	}

	_getChildInstance(name, lifecycleId) {
		let instance;
		const childContext = [...this.#children.values()].find((context) => {
			instance = context.getInstance(name, lifecycleId);
			return instance !== undefined;
		});
		return childContext ? instance : undefined;
	}

	getChildren() {
		return this.#children;
	}

	_addChild(childContext) {
		if (!(childContext instanceof AbstractContextContainer)) {
			throw new InvalidContextChild();
		}
		this.#children.set(childContext.name, childContext);
	}

	deleteChild(childName) {
		if (!this.#children.has(childName)) {
			return;
		}
		this.#children.get(childName)._removeParent();
		this.#children.delete(childName);
	}

	// eslint-disable-next-line no-unused-vars
	getScope(lifecycleId) {}

	filterClassesByLifecycle(lifecycleId) {
		return this.classTreeList.filter((cls) => cls.baseNode.lifecycle.id === lifecycleId);
	}

	// eslint-disable-next-line no-unused-vars
	#validateDIConfig(config) {
		// Check if there are objects with invalid name
		// !name !== true || typeof name === 'string'
		// if (!Array.isArray(config) || config.find(c => !(c instanceof DIObjectConfig))) {
		//     throw new InvalidContextConfig();
		// }
		// const objectWithInvalidName = config.find(({ name }) => !name === true || !(typeof name === 'string' || typeof name === 'symbol'));
		// if (objectWithInvalidName) {
		//     throw new DIObjectHasInvalidName(objectWithInvalidName.name, this.name);
		// }
		// Accept repeated names *, if these objects have other lifecycle
		// Check if there are objects with the same names
		// const configSet = new Set(this.config.map((objectConfig) => objectConfig.name));
		// if (this.config.length !== configSet.size) {
		//     const objectsByNames = Object.fromEntries(Array.from(configSet.values()).map(key => ([
		//         key,
		//         this.config.filter((objectConfig) => objectConfig.name === key),
		//     ])));
		//     const objectsWithRepeatedNames = Object.entries(objectsByNames).filter(([name, items]) => items.length > 1);
		//     throw new DIConfigHasObjectsWithRepeatedNames(objectsWithRepeatedNames.map(obj => obj[0]), this.name);
		// }
		// Check object lifecycle
		// Change this conditions after Lifecycle class will be defined.
		// lifecycle prop must be an instance of Lifecycle (it's checked in DIObjectConfig constructor)
		// !!! now we don't need to registrate id in LifecycleEnum, because it's done in Lifecycle's constructor
		// const objectWithInvalidLifecycle = this.config.find(({ lifecycle }) => {
		//     return !(lifecycle instanceof Lifecycle)
		//         || !Object.values(LifecycleEnum).find(v => v === lifecycle.id);
		// });
		// if (objectWithInvalidLifecycle) {
		//     throw new DIObjectHasInvalidLifecycleIdentifier(objectWithInvalidLifecycle.lifecycle.id, this.name);
		// }
		// Check Inheritance Hierarchy
		// this.config.forEach((clazz) => this.#validateInheritanceHierarchy(clazz.type));
	}

	#validateObjectsArgsNames() {
		const argsSet = new Set();
		this.#clazzes.forEach((cls) =>
			cls.constructor.args.forEach((arg) =>
				argsSet.add({
					name: arg,
					place: cls.name,
				}),
			),
		);
		argsSet.forEach((arg) => {
			const cls = this.#clazzes.find((elem) => elem.name === arg.name);
			if (cls === undefined) {
				throw new InvalidDIObjectArgumentName(arg.place, arg.name);
			}
		});
	}

	#validateInheritanceHierarchy(clazz) {
		// check inheritance existence
		// if base class exist and it is not an Object Class,
		//    check if base class is a part of this di context
		//      check if constructor arguments count <= derived class constructor args count and return to beggining,
		//			otherwise throw an exception
		// else return true
		if (parseType(clazz) !== "class") return true;
		const baseClass = getBaseClass(clazz);
		const isAnotherDIObject = this.config.findIndex((objConfig) => objConfig.type.name === baseClass.name) !== -1;
		console.log(clazz.name, baseClass.name, isAnotherDIObject);
		if (baseClass.name !== "Object") {
			if (isAnotherDIObject) {
				const clsConstructorArgs = getClassConstructorArgsNames(clazz).args;
				const baseClsConstructorArgs = getClassConstructorArgsNames(baseClass).args;
				if (clsConstructorArgs.length < baseClsConstructorArgs.length) {
					throw new DerivedClassConstructorArgsError(clazz.name, baseClass.name);
				}
			}
			return this.#validateInheritanceHierarchy(baseClass);
		} else {
			return true;
		}
	}

	#validateDependencyGraph() {
		this.#clazzes.forEach((cls) => {
			cls.constructor.args.forEach((arg) => {
				this.#findDependencyLoop([cls.name, arg], arg);
			});
		});
		return true;
	}

	#findDependencyLoop(depsList = [], argName) {
		if (this.#clazzes.length === 0) return;
		if (argName === undefined) argName = this.#clazzes[0].name;
		const cls = this.#clazzes.find((cls) => cls.name === argName);
		cls.constructor.args.forEach((elem) => {
			if (depsList.includes(elem)) {
				throw new DependencyLoopError(elem, cls.name);
			} else {
				this.#findDependencyLoop([...depsList, elem], elem);
			}
		});
	}
}

export default AbstractContextContainer;