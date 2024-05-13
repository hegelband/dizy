import AbstractContextContainer from "./AbstractContextContainer.js";
import DIObjectKeyFactory from "./helpers/DIObjectKeyFactory.js";
import SessionContainer from "./SessionContainer.js";
import SingletoneContainer from "./SingletoneContainer.js";
import DemandedFactory from "./DemandedFactory.js";
import generateRandomString from "../utils/generateRandomString.js";
import LifecycleEnum from "../constants/LifecycleEnum.js";

class NotUniqueContextContainerName extends Error {
	constructor(name) {
		super(`Context name '${name}' is not unique. Context name must be unique string.`);
	}
}

class InvalidContextContainerNameType extends Error {
	constructor() {
		super(`Invalid context name type. Type of context name must be a string.`);
	}
}

class ContextContainer extends AbstractContextContainer {
	constructor(config = [], name = "", parent = null, keyFactory = new DIObjectKeyFactory()) {
		if (name === "") {
			name = generateRandomString(7);
		}
		super(config, name, parent, keyFactory);
		ContextContainer.#addName(name);
		// this.#parent = parent;
		// this.#keyFactory = keyFactory;
	}

	static #names = new Set();
	static #addName(name) {
		if (typeof name !== "string") {
			throw new InvalidContextContainerNameType();
		}
		if (this.#names.has(name)) {
			throw new NotUniqueContextContainerName(name);
		}
		this.#names.add(name);
	}

	// #parent;
	// #keyFactory;

	scopes = new Map();

	_createScopes() {
		// sort scopes initialization order by desc of lifecycle id (order: Demanded -> Singletone -> Session -> Persistent)
		const scopesTypes = new Set(this.classTreeList.map((cls) => cls.baseNode.lifecycle).sort((a, b) => b.id - a.id));
		scopesTypes.forEach((lifecycle) => {
			switch (lifecycle.id) {
				// case LifecycleEnum.Persistent:
				//     this.scopes.set(lifecycle, new PersistentContainer(this, this.filterClassesByLifecycle(LifecycleEnum.Persistent)));
				//     console.log(this.scopes);
				//     break;
				case LifecycleEnum.Session:
					this.scopes.set(lifecycle.id, new SessionContainer(this, this.filterClassesByLifecycle(LifecycleEnum.Session)));
					// console.log(this.scopes);
					break;
				case LifecycleEnum.Singletone:
					this.scopes.set(lifecycle.id, new SingletoneContainer(this, this.filterClassesByLifecycle(LifecycleEnum.Singletone)));
					break;
				case LifecycleEnum.Demanded:
					this.scopes.set(lifecycle.id, new DemandedFactory(this, this.filterClassesByLifecycle(LifecycleEnum.Demanded)));
					break;
				default:
					break;
			}
		});
	}

	_initScopes() {
		this.scopes.forEach((scope) => {
			if (scope.init) {
				scope.init();
			}
		});
	}

	hasDIObject(name) {
		const classTree = this._findClassTree(name);
		return classTree !== undefined;
	}

	hasInstance(name) {
		const classTree = this._findClassTree(name);
		if (classTree === undefined) return false;
		const scope = this.getScope(classTree.baseNode.lifecycle.id);
		if (classTree.baseNode.lifecycle.id === LifecycleEnum.Demanded) return false;
		return scope.hasInstance(classTree.baseNode.key);
	}

	getInstance(name, lifecycleId, calledFromScope) {
		const clazz = this._findClassTree(name, lifecycleId);
		if (clazz === undefined) {
			if (calledFromScope) return undefined;
			return this._getChildInstance(name, lifecycleId);
		}
		const key = clazz.baseNode.key;
		const scope = this.getScope(clazz.baseNode.lifecycle.id);
		if (!scope) {
			if (calledFromScope) return undefined;
			return this._getChildInstance(name, lifecycleId);
		}
		if (scope instanceof DemandedFactory) return scope.createInstance(key);
		return calledFromScope ? scope.getInstance(key) : scope.getInstance(key) ?? this._getChildInstance(name, lifecycleId);
	}

	typeMatch(name, type) {
		// is DI object with name instance of type
		const clazz = this._findClassTree(name);
		if (clazz === undefined) {
			throw new Error("There is no di object with this name.");
		}
		return clazz.baseNode.type === type;
	}

	getScope(lifecycleId) {
		if (typeof lifecycleId !== "number" || !Object.values(LifecycleEnum).find((v) => v === lifecycleId)) {
			return null;
		}
		return this.scopes.get(lifecycleId);
	}
}

export default ContextContainer;
