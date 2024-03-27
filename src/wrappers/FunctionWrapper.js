class FunctionWrapper {
    constructor(func, args) {
        this.func = func;
        this.args = args;
        console.log('Func with args ', func, args);
    }

    call() {
        this.func(...args);
    }
}

export default FunctionWrapper;
