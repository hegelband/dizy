import deepEqual from "../../utils/deepEqual.js";

class PersistentInstanceProxyFactory {
    constructor() { }

    static create(instance, key) {
        return new Proxy(instance, {
            set(target, prop, value) {
                if (!deepEqual(target[prop], value)) {
                    console.log('cache');
                    target[prop] = value;
                    localStorage.setItem(key, JSON.stringify(target));
                    return true;
                }
                target[prop] = value;
                return true;
            }
        });
    }
}

export default PersistentInstanceProxyFactory;
