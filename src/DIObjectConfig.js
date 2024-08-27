import { parseType } from "../ReflectionJs/index.js";
import DemandedLifecycle from "./lifecycle/DemandedLifecycle.js";
import Lifecycle from "./lifecycle/Lifecycle.js";
import SessionLifecycle from "./lifecycle/SessionLifecycle.js";
import SingletoneLifecycle from "./lifecycle/SingletoneLifecycle.js";

/** @callback callbackType */

/** Class representing an error thrown when `name` of DIObjectConfig is invalid.
 * @class
 * @extends Error
 */
export class InvalidDIObjectName extends Error {
	constructor(name) {
		const message = `DI object name { ${name} } is invalid. Name must be a not empty string`;
		super(message);
		this.name = "InvalidDIObjectName";
	}
}

/** Class representing an error thrown when `parent` of DIObjectConfig is invalid.
 * @class
 * @extends Error
 */
export class InvalidDIObjectParent extends Error {
	constructor() {
		const message = "DI object parent must be an instance of AbstractContextContainer.";
		super(message);
		this.name = "InvalidDIObjectParent";
	}
}

/** Class representing an error thrown when `lifecycle` of DIObjectConfig is unregistered.
 * @class
 * @extends Error
 */
export class UnregisteredDIObjectLifecycle extends Error {
	constructor(lifecycle) {
		const message = `There is no registered lifecycle with id = ${lifecycle.id}.`;
		super(message);
		this.name = "UnregisteredDIObjectLifecycle";
	}
}

/** Class representing an error thrown when `lifecycle` of DIObjectConfig is invalid.
 * @class
 * @extends Error
 */
export class InvalidDIObjectLifecycle extends Error {
	constructor(lifecycle) {
		const message = `Invalid lifecycle { ${lifecycle} }. lifecycle prop must be an instance of Lifecycle or it's derived class.`;
		super(message);
		this.name = "InvalidDIObjectLifecycle";
	}
}

/** Class representing an error thrown when `type` of DIObjectConfig is invalid.
 * @class
 * @extends Error
 */
export class InvalidDIObjectType extends Error {
	constructor(type) {
		const message = `DI object type { ${type} } is invalid. type prop must be a class or a function`;
		super(message);
		this.name = "InvalidDIObjectType";
	}
}

/** Abstract Class representint di object config.
 * @class
 * @abstract
 * @template {Function} T
 */
export class DIObjectConfig {
	/**
	 * @constructor
	 * @param {string|symbol} name
	 * @param {T} type
	 * @param {Lifecycle} lifecycle
	 */
	constructor(name, type, lifecycle) {
		if (!(typeof name === "string" || typeof name === "symbol") || !name === true) {
			throw new InvalidDIObjectName(name);
		}
		if (parseType(type) !== "class" && parseType(type) !== "function" && parseType(type) !== "function class") {
			throw new InvalidDIObjectType(type);
		}
		if (!(lifecycle instanceof Lifecycle)) {
			throw new InvalidDIObjectLifecycle(lifecycle);
		}
		this.name = name;
		this.type = type;
		this.lifecycle = lifecycle;
	}
}

/** Class representing a config of di object with demanded lifecycle
 * @class
 * @property {DemandedLifecycle} lifecycle
 */
export class DemandedConfig extends DIObjectConfig {
	/**
	 *
	 * @param {string|symbol} name
	 * @param {callbackType} type
	 * @param {callbackType} [beforeCreate=()=>{}]
	 * @param {callbackType} [afterCreate=()=>{}]
	 */
	constructor(name = "", type = {}, beforeCreate = () => {}, afterCreate = () => {}) {
		super(name, type, new DemandedLifecycle(beforeCreate, afterCreate));
	}
}

/** Class representing a config of di object with singletone lifecycle
 * @class
 * @property {SingletoneLifecycle} lifecycle
 */
export class SingletoneConfig extends DIObjectConfig {
	/**
	 *
	 * @param {string|symbol} name
	 * @param {callbackType} type
	 * @param {callbackType} [beforeCreate=()=>{}]
	 * @param {callbackType} [afterCreate=()=>{}]
	 */
	constructor(name = "", type = {}, beforeCreate = () => {}, afterCreate = () => {}) {
		super(name, type, new SingletoneLifecycle(beforeCreate, afterCreate));
	}
}

/** Class representing a config of di object with session lifecycle
 * @class
 * @property {SessionLifecycle} lifecycle
 */
export class SessionConfig extends DIObjectConfig {
	/**
	 *
	 * @param {string|symbol} name
	 * @param {callbackType} type
	 * @param {callbackType} [beforeCreate=()=>{}]
	 * @param {callbackType} [afterCreate=()=>{}]
	 */
	constructor(name = "", type = {}, beforeCreate = () => {}, afterCreate = () => {}) {
		super(name, type, new SessionLifecycle(beforeCreate, afterCreate));
	}
}
