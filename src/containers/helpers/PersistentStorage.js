class PersistentStorage {
    constructor(storage = localStorage) {
        this.storage = storage;
    }

    getInstances(parent) {
        const cachedValue = this.storage.getItem(parent);
        let instances = [];
        try {
            instances = JSON.parse(cachedValue);
            if (!Array.isArray(instances)) throw new Error(`Cached value of persistent instances from context ${parent} is not an array.`);
        } catch (error) {
            console.log(error);
            instances = [];
        }
        return instances;
    }

    setInstances(parent, instances) {
        this.storage.setItem(parent, JSON.stringify(instances));
    }
}

export default PersistentStorage;
