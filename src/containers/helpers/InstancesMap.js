import deepEqual from "../../utils/deepEqual.js";

class InstancesMap extends Map {
	constructor() {
		super();
	}

	get(symbolKey) {
		if (typeof symbolKey === "object" || typeof symbolKey === "symbol") {
			let instance = undefined;
			this.forEach((value, key) => {
				const elemKey = typeof key === "symbol" ? Symbol.keyFor(key) : key;
				const k = typeof symbolKey === "symbol" ? Symbol.keyFor(symbolKey) : symbolKey;
				if (deepEqual(elemKey, k)) {
					instance = value;
				}
			});
			return instance;
		}
		return super.get(symbolKey);
	}

	has(symbolKey) {
		if (typeof symbolKey === "object" || typeof symbolKey === "symbol") {
			let isExist = false;
			this.forEach((value, key) => {
				const elemKey = typeof key === "symbol" ? Symbol.keyFor(key) : key;
				const k = typeof symbolKey === "symbol" ? Symbol.keyFor(symbolKey) : symbolKey;
				if (deepEqual(elemKey, k)) {
					isExist = true;
				}
			});
			return isExist;
		}
		return super.has(symbolKey);
	}
}

export default InstancesMap;
