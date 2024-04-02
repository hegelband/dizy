import { InvalidDIObjectLifecycle, InvalidDIObjectName, InvalidDIObjectParent } from "../../DIObjectConfig";
import deepEqual from "../../utils/deepEqual";
import ContextContainer from "../ContextContainer";
import DIObjectKey from "./DIObjectKey";

class NotUniqueDIObjectKey extends Error {
    constructor({ parent, name, lifecycle, isClass }) {
        const message = `DI key with {
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
            isClass
        }
        let keyExisted = null;
        this.#keys.forEach((objectKey) => {
            if (deepEqual(Symbol.keyFor(objectKey.key), keyDescription)) {
                keyExisted = value;
            }
        });
        if (keyExisted) throw new NotUniqueDIObjectKey(keyDescription);
        const key = new DIObjectKey(Symbol.for(`@${keyDescription.parent?.name}/${keyDescription.name}/${keyDescription.lifecycle}/${keyDescription.isClass}`));
        this.#keys.add(key);
        return key;
    }

    #validateKeyParams(parent, name, lifecycle, isClass) {
        if (parent && !(parent instanceof ContextContainer)) {
            throw new InvalidDIObjectParent();
        }
        if (typeof name !== 'string' || !name === true) {
            throw new InvalidDIObjectName(name);
        }
        if (typeof lifecycle !== 'number' || lifecycle < 0 || lifecycle > 3) {
            throw new InvalidDIObjectLifecycle(lifecycle);
        }
        return true;
    }
}

export default DIObjectKeyFactory;
