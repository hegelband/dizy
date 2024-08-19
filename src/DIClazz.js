import { parseType } from "../ReflectionJs/index.js";
import Lifecycle from "./lifecycle/Lifecycle.js";

/** Supporting class for di object
 * @class
 */
class DIClazz {
	/**
	 *
	 * @param {string|symbol|number|object} key
	 * @param {string} name
	 * @param {import("./DIObjectConfig.js").callbackType} type
	 * @param {boolean} isClass
	 * @param {Lifecycle} lifecycle
	 * @param {{args: string[]}} constructor
	 */
	constructor(key, name, type, isClass, lifecycle, constructor) {
		if (parseType(key) === "undefined" || parseType(key) === "null" || parseType(key) === "boolean") {
			throw new Error("DIClazz constructor argument 'key' is invalid. Argument 'key' must not be an undefined, null or boolean.");
		}
		if (parseType(name) !== "string") {
			throw new Error("DIClazz constructor argument 'name' is invalid. Argument 'name' type must be a string.");
		}
		if (parseType(type) !== "class" && parseType(type) !== "function" && parseType(type) !== "function class") {
			throw new Error("DIClazz constructor argument 'type' is invalid. Argument 'type' must be a class or a function.");
		}
		if (parseType(isClass) !== "boolean") {
			throw new Error("DIClazz constructor argument 'isClass' is invalid. Argument 'isClass' must be a boolean.");
		}
		if (!(lifecycle instanceof Lifecycle)) {
			throw new Error("DIClazz constructor argument 'lifecycle' is invalid. Argument 'lifecycle' must be an instance of Lifecycle.");
		}
		// if (!Object.values(LifecycleEnum).find(v => v === lifecycle.id)) {
		//     throw new UnregisteredDIObjectLifecycle(lifecycle);
		// }
		this.key = key;
		this.name = name;
		this.type = type;
		this.isClass = isClass;
		this.lifecycle = lifecycle;
		this.constructor = constructor;
	}
}

export default DIClazz;
