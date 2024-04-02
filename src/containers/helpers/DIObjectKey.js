class DIObjectKey {
    constructor(key) {
        this.key = key;
    }

    parseKey() {
        // get data from key string
        return Symbol.keyFor(this.key);
    }
}

export default DIObjectKey;
