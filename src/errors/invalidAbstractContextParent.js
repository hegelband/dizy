class InvalidAbstractContextParent extends Error {
	constructor() {
		super("Invalid context parent. Parent must be an instance of AbstractContextContainer or it's derived class, null or undefined.");
	}
}

export default InvalidAbstractContextParent;
