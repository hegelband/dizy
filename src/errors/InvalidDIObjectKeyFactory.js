class InvalidDIObjectKeyFactory extends Error {
	constructor() {
		super("Invalid context keyFactory. KeyFactory must be an instance of DIObjectKeyFactory or it's derived class");
	}
}

export default InvalidDIObjectKeyFactory;
