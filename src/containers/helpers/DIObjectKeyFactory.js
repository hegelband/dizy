import { InvalidDIObjectLifecycle, InvalidDIObjectName, InvalidDIObjectParent } from "../../DIObjectConfig";
// import deepEqual from "../../utils/deepEqual";
import ContextContainer from "../ContextContainer";
import DIObjectKey from "./DIObjectKey";

class NotUniqueDIObjectKey extends Error {
    constructor({ parent, name, lifecycle, isClass }) {
        const message = `DI key with description {
            parent: ${parent ? parent.name : 'null'},
            name: ${name},
            lifecycle: ${lifecycle},
            isClass: ${isClass}
        } isn't unique. There is another DI object with this key.`;
        super(message);
        this.name = 'NotUniqueDIKey';
    }
}

class DIObjectKeyFactory {
    constructor(keys = new Set()) {
        this.#keys = keys;
    }

    #keys;

    createKey(parent, name, lifecycle, isClass) {
        this.#validateKeyParams(parent, name, lifecycle, isClass);
        const keyDescription = {
            parent,
            name,
            lifecycle,
            isClass,
        };
        const keyDescriptionStr = this.#stringifyKeyDescription(keyDescription);
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
        this.#keys.add(key);
        return key;
    }

    #stringifyKeyDescription({ parent, name, lifecycle, isClass }) {
        return `@${parent?.name}/${name}/${lifecycle}/${isClass}`;
    }

    #validateKeyParams(parent, name, lifecycle, isClass) {
        if (parent && !(parent instanceof ContextContainer)) {
            throw new InvalidDIObjectParent();
        }
        if (!(typeof name === 'string' || typeof name === 'symbol') || !name === true) {
            throw new InvalidDIObjectName(name);
        }
        if (typeof lifecycle !== 'number' || lifecycle < 0 || lifecycle > 3) {
            throw new InvalidDIObjectLifecycle(lifecycle);
        }
        return true;
    }
}

export default DIObjectKeyFactory;

