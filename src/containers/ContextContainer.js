import AbstractContextContainer from "./AbstractContextContainer.js";
import DIObjectKeyFactory from "./helpers/DIObjectKeyFactory.js";
import SessionContainer from "./SessionContainer.js";
import SingletoneContainer from "./SingletoneContainer.js";
import DemandedFactory from "./DemandedFactory.js";
import LifecycleEnum from "../constants/LifecycleEnum.js";
// eslint-disable-next-line no-unused-vars
import { DemandedConfig, DIObjectConfig, SessionConfig, SingletoneConfig } from "../DIObjectConfig.js";

/** Class for context - ContextContainer.
 * It takes config and generates dependency trees, validates it, creates scopes and allow to get instances
 * @class
 * @extends AbstractContextContainer
 */
class ContextContainer extends AbstractContextContainer {
	/**
	 *
	 * @param {DIObjectConfig[]} [config=[]]
	 * @param {string} [name=""]
	 * @param {ContextContainer} [parent=null]
	 * @param {DIObjectKeyFactory} [keyFactory=new DIObjectKeyFactory()]
	 */
	constructor(config = [], name = "", parent = null, keyFactory = new DIObjectKeyFactory()) {
		super(config, name, parent, keyFactory);
		// this.#parent = parent;
		// this.#keyFactory = keyFactory;
	}

	// #parent;
	// #keyFactory;

	/** Creates all needed scopes for this context by lifecycles.
	 * @protected
	 */
	_createScopes() {
		// sort scopes initialization order by desc of lifecycle id (order: Demanded -> Singletone -> Session -> Persistent)
		const scopesTypes = new Set(this.classTreeList.map((cls) => cls.baseNode.lifecycle).sort((a, b) => b.id - a.id));
		scopesTypes.forEach((lifecycle) => {
			switch (lifecycle.id) {
				case LifecycleEnum.Session:
					this.scopes.set(lifecycle.id, new SessionContainer(this, this.filterClassesByLifecycle(LifecycleEnum.Session)));
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

	/** Calls each scope init method if it exists.
	 * @protected
	 */
	_initScopes() {
		this.scopes.forEach((scope) => {
			if (scope.init) {
				scope.init();
			}
		});
	}

	/** Add DI Object to this context
	 * @public
	 * @param {SingletoneConfig|SessionConfig|DemandedConfig} diObjectConfig - config of new di object
	 * @returns {boolean}
	 */
	addDIObject(diObjectConfig) {
		const tree = super.addDIObject(diObjectConfig);
		if (!this.scopes.has(tree.baseNode.lifecycle.id)) {
			switch (tree.baseNode.lifecycle.id) {
				case LifecycleEnum.Session:
					this.scopes.set(tree.baseNode.lifecycle.id, new SessionContainer(this, [tree]));
					break;
				case LifecycleEnum.Singletone:
					this.scopes.set(tree.baseNode.lifecycle.id, new SingletoneContainer(this, [tree]));
					break;
				case LifecycleEnum.Demanded:
					this.scopes.set(tree.baseNode.lifecycle.id, new DemandedFactory(this, [tree]));
					break;
				default:
					break;
			}
		} else {
			const scope = this.scopes.get(tree.baseNode.lifecycle.id);
			scope.addDIObject(tree);
		}
		return true;
	}

	/** Returns `true` if context has di object with specified name.
	 * @public
	 * @param {string|symbol|Function} name - name of di object from this context
	 * @returns {boolean}
	 */
	hasDIObject(name) {
		const classTree = this._findClassTree(name);
		return classTree !== undefined;
	}

	/** Returns `true` if context has an instance of di object with specified name.
	 * @public
	 * @param {string|symbol|Function} name - name of di object from this context
	 * @returns {boolean}
	 */
	hasInstance(name) {
		const classTree = this._findClassTree(name);
		if (classTree === undefined) return false;
		const scope = this.getScope(classTree.baseNode.lifecycle.id);
		if (classTree.baseNode.lifecycle.id === LifecycleEnum.Demanded) return false;
		return scope.hasInstance(classTree.baseNode.key);
	}

	/**
	 * @template T
	 * @typedef {T extends abstract new (...args: any[]) => infer P ? P : T extends Function ? T : any} GetInstanceReturnType<T>
	 */

	/** Get an instance of di object with specified name and lifecycleId.
	 * @public
	 * @template {string | symbol | Function} T
	 * @param {T} name - name of di object from this context
	 * @param {number} [lifecycleId] - id of Lifecycle
	 * @param {boolean} [calledFromScope] - true only if this method is called from scope
	 * @returns {GetInstanceReturnType<T>}
	 */
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

	/** Returns `true` if type of di object with specified key is the same as 'type' argument.
	 * @public
	 * @param {string|symbol} key - 'key' of di object
	 * @param {any} type - type of di object
	 * @returns {boolean}
	 */
	typeMatch(name, type) {
		// is DI object with name instance of type
		const clazz = this._findClassTree(name);
		if (clazz === undefined) {
			throw new Error("There is no di object with this name.");
		}
		return clazz.baseNode.type === type;
	}

	/** Get scope by lifecycle id.
	 * @public
	 * @param {number} lifecycleId - id of Lifecycle
	 * @returns {SingletoneContainer|SessionContainer|DemandedFactory}
	 */
	// eslint-disable-next-line no-unused-vars
	getScope(lifecycleId) {
		if (typeof lifecycleId !== "number" || !Object.values(LifecycleEnum).find((v) => v === lifecycleId)) {
			return null;
		}
		return this.scopes.get(lifecycleId);
	}
}

export default ContextContainer;
