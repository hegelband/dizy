import { parseType } from "../../../ReflectionJs/index.js";
import {
	// InvalidDIObjectName,
	// InvalidDIObjectParent,
	UnregisteredDIObjectLifecycle,
} from "../../DIObjectConfig.js";
import Lifecycle from "../../lifecycle/Lifecycle.js";
// eslint-disable-next-line no-unused-vars
import ContextContainer from "../ContextContainer.js";
import AbstractContextContainer from "../AbstractContextContainer.js";
// import deepEqual from "../../utils/deepEqual";
import DIObjectKey from "./DIObjectKey.js";
import LifecycleEnum from "../../constants/LifecycleEnum.js";

/** Class represents an error thrown when di object's key isn't unique
 * @class
 * @extends Error
 */
class NotUniqueDIObjectKey extends Error {
	constructor({ parent, name, lifecycle, isClass }) {
		const message = `DI key with description {
            parent: ${parent ? parent.name : "null"},
            name: ${name},
            lifecycle: ${lifecycle.id},
            isClass: ${isClass}
        } isn't unique. There is another DI object with this key.`;
		super(message);
		this.name = "NotUniqueDIKey";
	}
}

/** Class representing factory for di object keys
 * @class
 */
class DIObjectKeyFactory {
	/**
	 *
	 * @param {Map} [keys=new Map()]
	 */
	constructor(keys = new Map()) {
		this.#keys = keys;
	}

	#keys;

	/** Returns new key string
	 *
	 * @param {AbstractContextContainer} parent
	 * @param {string} name
	 * @param {Lifecycle} lifecycle
	 * @param {boolean} isClass
	 * @returns {string}
	 */
	createKey(parent, name, lifecycle, isClass) {
		this.#validateKeyParams(parent, name, lifecycle, isClass);
		const keyDescription = {
			parent,
			name,
			lifecycle,
			isClass,
		};
		const keyDescriptionStr = this.#stringifyKeyDescription(keyDescription);
		if (this.#keys.has(keyDescriptionStr)) {
			throw new NotUniqueDIObjectKey(keyDescription);
		}
		const key = new DIObjectKey(keyDescriptionStr);
		this.#keys.set(keyDescriptionStr, key);
		return key;
	}

	#stringifyKeyDescription({ parent, name, lifecycle, isClass }) {
		console.log(parent);
		return `@${parent?.name}/${name}/${lifecycle.id}/${isClass}`;
	}

	#validateKeyParams(parent, name, lifecycle, isClass) {
		if (!(parent instanceof AbstractContextContainer)) {
			throw new Error("DIObjectKeyFactory.create() 'parent' arg is invalid. 'parent' must be an instance of AbstractContextContainer");
		}
		if (parseType(name) !== "string") {
			throw new Error("DIObjectKeyFactory.create() 'name' arg is invalid. 'name' must be a string.");
		}
		if (name === "") {
			throw new Error("DIObjectKeyFactory.create() 'name' arg is empty.");
		}
		if (!(lifecycle instanceof Lifecycle)) {
			throw new Error("DIObjectKeyFactory.create() 'lifecycle' arg is invalid. 'lifecycle' must be an instance of Lifecycle");
		}
		if (!Object.values(LifecycleEnum).find((v) => v === lifecycle.id)) {
			throw new UnregisteredDIObjectLifecycle(lifecycle);
		}
		if (parseType(isClass) !== "boolean") {
			throw new Error("DIObjectKeyFactory.create() 'isClass' arg type is invalid. 'isClass' type must be boolean");
		}
		return true;
	}
}

export default DIObjectKeyFactory;
