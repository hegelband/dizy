// todo: DIContainer interface - not abstract class. For base constructors create AbstractDIContainer class.
class DIContainer {
	constructor() {}
	// _createInstance() { } // protected method

	hasInstance() {}

	getInstance() {}

	filterInstances() {}

	getParent() {}

	// eslint-disable-next-line no-unused-vars
	typeMatch(key, type) {
		// is DI object with key instance of type
	}
}

export default DIContainer;
