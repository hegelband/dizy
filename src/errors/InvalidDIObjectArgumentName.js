class InvalidDIObjectArgumentName extends Error {
    constructor(type, argName) {
        const message = `Invalid argument name { ${argName} } in ${type}. There is no object with name { ${argName} } in DI Container.`
        super(message);
        this.name = 'Invalid DI Object arg name error.';
    }
}

export default InvalidDIObjectArgumentName;
