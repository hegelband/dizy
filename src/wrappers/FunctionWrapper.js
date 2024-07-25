class FunctionWrapper {
	constructor(func, args) {
		this.func = func;
		this.args = args;
	}

	call() {
		return this.func(...this.args);
	}
}

export default FunctionWrapper;
