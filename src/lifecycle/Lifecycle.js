/** Class representing an error thrown when derived class don't implement something.
 * @class
 */
class NotImplementedException extends Error {
	constructor() {
		this.message = "Not implemented error";
		super(this.message);
	}
}

/** Abstract Class representing lifecycle of di object
 * @class
 * @abstract
 */
class Lifecycle {
	/**
	 *
	 * @param {number} id
	 */
	constructor(id) {
		this.id = id;
	}

	/** Lifecycle method that's called before creation of di object's instance */
	beforeCreate() {
		throw new NotImplementedException();
	}

	/** Lifecycle method that's called after creation of di object's instance */
	afterCreate() {
		throw new NotImplementedException();
	}
}

export default Lifecycle;
