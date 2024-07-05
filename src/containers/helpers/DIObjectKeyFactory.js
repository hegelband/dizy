import { parseType } from "../../../ReflectionJs/index.js";
import { InvalidDIObjectName, InvalidDIObjectParent, UnregisteredDIObjectLifecycle } from "../../DIObjectConfig.js";
import Lifecycle from "../../lifecycle/Lifecycle.js";
// eslint-disable-next-line no-unused-vars
import ContextContainer from "../ContextContainer.js";
import AbstractContextContainer from "../AbstractContextContainer.js";
// import deepEqual from "../../utils/deepEqual";
import DIObjectKey from "./DIObjectKey.js";
import LifecycleEnum from "../../constants/LifecycleEnum.js";

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

class DIObjectKeyFactory {
	constructor(keys = new Set()) {
		this.#keys = keys;
	}

	// todo: Change from Set to Map
	#keys;

	createKey(parent, name, lifecycle, isClass) {
		// todo: fix validation.
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
		if (parseType(isClass) !== "boolean") {
			throw new Error("DIObjectKeyFactory.create() 'isClass' arg type is invalid. 'isClass' type must be boolean");
		}
		this.#validateKeyParams(parent, name, lifecycle, isClass);
		const keyDescription = {
			parent,
			name,
			lifecycle,
			isClass,
		};
		const keyDescriptionStr = this.#stringifyKeyDescription(keyDescription);
		// todo: move to method findKey and submethod isExistKey. Need O(1), not O(n)
		//start
		let keyExisted = null;
		this.#keys.forEach((objectKey) => {
			// if (typeof objectKey.key === 'symbol') {
			//     if (deepEqual(Symbol.keyFor(objectKey.key), keyDescription)) {
			//         keyExisted = true;
			//     }
			// } else {
			if (objectKey.key === keyDescriptionStr) keyExisted = true;
			// }
		});
		if (keyExisted) throw new NotUniqueDIObjectKey(keyDescription);
		// const key = new DIObjectKey(Symbol.for(keyDescriptionStr));
		const key = new DIObjectKey(keyDescriptionStr);
		//end
		this.#keys.add(key);
		return key;
	}

	#stringifyKeyDescription({ parent, name, lifecycle, isClass }) {
		console.log(parent);
		return `@${parent?.name}/${name}/${lifecycle.id}/${isClass}`;
	}

	// eslint-disable-next-line no-unused-vars
	#validateKeyParams(parent, name, lifecycle, isClass) {
		if (parent && !(parent instanceof AbstractContextContainer)) {
			throw new InvalidDIObjectParent();
		}
		if (!(typeof name === "string" || typeof name === "symbol") || !name === true) {
			throw new InvalidDIObjectName(name);
		}
		if (!Object.values(LifecycleEnum).find((v) => v === lifecycle.id)) {
			throw new UnregisteredDIObjectLifecycle(lifecycle);
		}
		return true;
	}
}

export default DIObjectKeyFactory;
