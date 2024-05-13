class NotAllowedDIObjectType extends Error {
	constructor(data) {
		const message = `Not allowed DI object type of ${data.__proto__.prototype.name}. DI object must be class or function.`;
		super(message);
		this.name = "Invalid DI Object type.";
	}
}

export default NotAllowedDIObjectType;
