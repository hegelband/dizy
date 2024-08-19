/** Class representing a function that's a di object
 * @class
 */
class FunctionWrapper {
	/**
	 *
	 * @param {import("../DIObjectConfig").callbackType} func
	 * @param {any} args - arguments of `func`
	 */
	constructor(func, args) {
		this.func = func;
		this.args = args;
		// console.log('Func with args ', func, args);
	}

	/** Calls `func`
	 *
	 * @returns {any}
	 */
	call() {
		return this.func(...this.args);
	}
}

export default FunctionWrapper;
