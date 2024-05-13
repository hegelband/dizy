import deepEqual from "../../utils/deepEqual.js";

class InstancesMap extends Map {
	constructor() {
		super();
	}

	getBySymbol(symbolKey) {
		let instance = undefined;
		this.forEach((value, key) => {
			if (deepEqual(Symbol.keyFor(key), Symbol.keyFor(symbolKey))) {
				instance = value;
			}
		});
		return instance;
	}

	hasBySymbol(symbolKey) {
		let isExist = false;
		this.forEach((value, key) => {
			if (deepEqual(Symbol.keyFor(key), Symbol.keyFor(symbolKey))) {
				isExist = true;
			}
		});
		return isExist;
	}
}

export default InstancesMap;
