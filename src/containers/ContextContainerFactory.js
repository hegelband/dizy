import ContextContainer from "./ContextContainer.js"; // need to be before import of AbstractContextContainerFactory (why so?)
import AbstractContextContainerFactory from "./AbstractContextContainerFactory.js";
import generateRandomString from "../utils/generateRandomString.js";
import InvalidContextContainerNameType from "../errors/InvalidContextContainerNameType.js";
import NotUniqueContextContainerName from "../errors/NotUniqueContextContainerName.js";
import DIObjectKeyFactory from "./helpers/DIObjectKeyFactory.js";

/** Class for creation of ContextContainer - ContextContainerFactory.
 *
 * @class
 * @extends AbstractContextContainerFactory
 */
class ContextContainerFactory extends AbstractContextContainerFactory {
	static #names = new Set();
	static #addName(name) {
		if (typeof name !== "string") {
			throw new InvalidContextContainerNameType();
		}
		if (ContextContainerFactory.#names.has(name)) {
			throw new NotUniqueContextContainerName(name);
		}
		ContextContainerFactory.#names.add(name);
	}

	/** Returns new AbstractContextContainer.
	 * @static
	 * @param {DIObjectConfig[]} [config=[]] - list of di objects configs
	 * @param {string} [name=""] - name of context
	 * @param {AbstractDIContainer} [parent=null] - parent context
	 * @param {DIObjectKeyFactory} [keyFactory=new DIObjectKeyFactory()] - Keys Factory
	 * @returns {ContextContainer}
	 */
	static createContainer(config = [], name = "", parent = null, keyFactory = new DIObjectKeyFactory()) {
		if (name === "") {
			name = generateRandomString(7);
			console.log(name);
		}
		if (super.validateContainerParams(config, name, parent, keyFactory)) {
			const context = new ContextContainer(config, name, parent, keyFactory);
			context.setParent(parent);
			ContextContainerFactory.#addName(name);
			return context;
		}
		return null;
	}
}

export default ContextContainerFactory;
