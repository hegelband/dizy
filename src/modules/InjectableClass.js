class InjectableClass {
    constructor() {
        const argsDict = arguments ? arguments[0] : null;
        this.getConstructorArguments = function () {
            if (!argsDict) return [];
            return Object.keys(argsDict);
        };
    }
}

export default InjectableClass;
