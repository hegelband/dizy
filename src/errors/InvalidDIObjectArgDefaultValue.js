class InvalidDIObjectArgDefaultValue extends Error {
	constructor(type, argName, defaultValue) {
		const message = `Invalid argument { ${argName} } default value in ${type}. There is no { ${defaultValue} } in DI Container.`;
		super(message);
		this.name = "Invalid DI Object arg default value error.";
	}
}

export default InvalidDIObjectArgDefaultValue;
