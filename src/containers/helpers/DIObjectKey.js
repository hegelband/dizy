import { parseType } from "../../../ReflectionJs/index.js";

class InvalidKey extends Error {
    constructor(key) {
        super(
            `DIObjectKey constructor argument ('key' = ${key ? key.toString() : key} (type - ${parseType(key)})) is invalid.\n` +
            `Argument 'key' must be a string like '@{parentName}/{DIObjectName}/{lifecycleId}/{isClass}'`
        );
    }
}

class DIObjectKey {
    constructor(key) {
        if (typeof key !== 'string') {
            throw new InvalidKey(key);
        }
        if (!/@[\w\s]+\/[\w\s]+\/[\d]+\/true/.test(key) && !/@[\w\s]+\/[\w\s]+\/[\d]+\/false/.test(key)) {
            throw new InvalidKey(key);
        }
        this.key = key;
    }

    parseKey() {
        // get data from key string
        // return Symbol.keyFor(this.key);
        const keyFields = this.key.split('/');
        return {
            parent: {
                name: keyFields[0].length > 1 ? keyFields[0].slice(1) : '',
            },
            name: keyFields[1],
            lifecycle: Number(keyFields[2]),
            isClass: Boolean(keyFields[3]),
        };
    }
}

export default DIObjectKey;