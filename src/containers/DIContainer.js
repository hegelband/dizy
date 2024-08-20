/** Interface for classes that repressent a di container
 * @abstract
 */
class DIContainer {
	constructor() {}

	/** Returns true if there is an instance of di object in DIContainer. */
	hasInstance() {}

	/** Get an instance of di object. */
	getInstance() {}

	/** Get parent DIContainer. */
	getParent() {}

	/** Returns `true` if type of di object with specified key is the same as 'type' argument.
	 *
	 * @param {string|symbol} key - 'key' of di object
	 * @param {any} type - type of di object
	 * @returns {boolean}
	 */
	// eslint-disable-next-line no-unused-vars
	typeMatch(key, type) {
		// is DI object with key instance of type
	}
}

export default DIContainer;
