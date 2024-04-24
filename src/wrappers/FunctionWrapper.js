class FunctionWrapper {
    constructor(func, args) {
        this.func = func;
        this.args = args;
        // console.log('Func with args ', func, args);
    }

    call() {
        return this.func(...this.args);
    }
}

export default FunctionWrapper;
