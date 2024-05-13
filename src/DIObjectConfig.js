import { parseType } from "../ReflectionJs/index.js";
import DemandedLifecycle from "./lifecycle/DemandedLifecycle.js";
import Lifecycle from "./lifecycle/Lifecycle.js";
import SessionLifecycle from "./lifecycle/SessionLifecycle.js";
import SingletoneLifecycle from "./lifecycle/SingletoneLifecycle.js";

export class InvalidDIObjectName extends Error {
	constructor(name) {
		const message = `DI object name { ${name} } is invalid. Name must be a not empty string`;
		super(message);
		this.name = "InvalidDIObjectName";
	}
}

export class InvalidDIObjectParent extends Error {
	constructor() {
		const message = "DI object parent must be an instance of ContextContainer.";
		super(message);
		this.name = "InvalidDIObjectParent";
	}
}

export class UnregisteredDIObjectLifecycle extends Error {
	constructor(lifecycle) {
		const message = `There is no registered lifecycle with id = ${lifecycle.id}.`;
		super(message);
		this.name = "UnregisteredDIObjectLifecycle";
	}
}

export class InvalidDIObjectLifecycle extends Error {
	constructor(lifecycle) {
		const message = `Invalid lifecycle { ${lifecycle} }. lifecycle prop must be an instance of Lifecycle or it's derived class.`;
		super(message);
		this.name = "InvalidDIObjectLifecycle";
	}
}

export class InvalidDIObjectType extends Error {
	constructor(type) {
		const message = `DI object type { ${type} } is invalid. type prop must be a class or a function`;
		super(message);
		this.name = "InvalidDIObjectType";
	}
}

export class DIObjectConfig {
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

export class DemandedConfig extends DIObjectConfig {
	constructor(name = "", type = {}, beforeCreate = () => {}, afterCreate = () => {}) {
		super(name, type, new DemandedLifecycle(beforeCreate, afterCreate));
	}
}

export class SingletoneConfig extends DIObjectConfig {
	constructor(name = "", type = {}, beforeCreate = () => {}, afterCreate = () => {}) {
		super(name, type, new SingletoneLifecycle(beforeCreate, afterCreate));
	}
}

export class SessionConfig extends DIObjectConfig {
	constructor(name = "", type = {}, beforeCreate = () => {}, afterCreate = () => {}) {
		super(name, type, new SessionLifecycle(beforeCreate, afterCreate));
	}
}
