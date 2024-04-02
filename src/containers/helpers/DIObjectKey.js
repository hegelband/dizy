class DIObjectKey {
    constructor(key) {
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
            lifecycle: keyFields[2],
            isClass: keyFields[3],
        };
    }
}

export default DIObjectKey;