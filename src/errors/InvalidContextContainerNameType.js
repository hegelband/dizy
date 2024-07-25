class InvalidContextContainerNameType extends Error {
	constructor() {
		super(`Invalid context name type. Type of context name must be a string.`);
	}
}

export default InvalidContextContainerNameType;
