class NotUniqueContextContainerName extends Error {
	constructor(name) {
		super(`Context name '${name}' is not unique. Context name must be unique string.`);
	}
}

export default NotUniqueContextContainerName;
