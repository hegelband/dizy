class HasNoConstructorError extends Error {
    constructor() {
        this.message = 'DI object has no one constructor. Need one or more.';
        super(this.message);
    }
}

const getClassConstructorArgsNames = clsStr => {
    const separator = 'constructor';
    const startIndex = clsStr.indexOf(separator, 0);
    if (startIndex === -1) {
        throw new HasNoConstructorError();
    }
    const openBraceStartIndex = clsStr.indexOf('(', startIndex);
    const closeBraceStartIndex = clsStr.indexOf(')', openBraceStartIndex);
    const argsStr = clsStr.slice(openBraceStartIndex + 1, closeBraceStartIndex);
    const args = argsStr.split(',').map(arg => arg.trim()).filter(arg => arg !== '');
    return {
        startPosition: startIndex,
        args,
    };

}

export default getClassConstructorArgsNames;