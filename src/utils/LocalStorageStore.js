import KeyValueStore from "./KeyValueStore";

class LocalStorageStore extends KeyValueStore {
    constructor() { }

    get(key) {
        const value = localStorage.getItem(key);
        if (!value) {
            return undefined;
        }
        try {
            const parsedValue = JSON.parse(value);
            if (!parsedValue) return undefined;
            return parsedValue;
        } catch (error) {
            console.log(error);
        }
    }

    set(key, instance) {
        try {
            const instanceJson = JSON.stringify(instance);
            localStorage.setItem(key, instanceJson);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default LocalStorageStore;
