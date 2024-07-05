class InvalidAbstractContextConfig extends Error {
	constructor() {
		super("Invalid context config. Config must be an array of DIObjectConfig instances");
	}
}

export default InvalidAbstractContextConfig;
