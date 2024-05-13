class HasNoDIObjectWithKey extends Error {
	constructor(key, contextName) {
		const message = `There is no DI object with key { ${key} } in { ${contextName} } context.`;
		super(message);
		this.name = "DI object not found.";
	}
}

export default HasNoDIObjectWithKey;
