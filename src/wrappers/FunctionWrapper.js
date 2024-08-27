/** Class representing a function that's a di object
 * @class
 * @template {Function} T
 */
class FunctionWrapper {
	/**
	 * @param {T} func
	 * @param {any} args - arguments of `func`
	 */
	constructor(func, args) {
		this.func = func;
		this.args = args;
		this.call.bind(this);
	}

	/** Calls `func`
	 *
	 * @returns {any}
	 */
	call = function () {
		if (new.target) {
			return new this.func(...this.args);
		}
		return this.func(...this.args);
	};
}

export default FunctionWrapper;
