import AbstractContextContainerFactory from "./AbstractContextContainerFactory.js";
import ContextContainer from "./ContextContainer.js";
import generateRandomString from "../utils/generateRandomString.js";
import InvalidContextContainerNameType from "../errors/InvalidContextContainerNameType.js";
import NotUniqueContextContainerName from "../errors/NotUniqueContextContainerName.js";
import DIObjectKeyFactory from "./helpers/DIObjectKeyFactory.js";

class ContextContainerFactory extends AbstractContextContainerFactory {
	static #names = new Set();
	static #addName(name) {
		if (typeof name !== "string") {
			throw new InvalidContextContainerNameType();
		}
		if (this.#names.has(name)) {
			throw new NotUniqueContextContainerName(name);
		}
		ContextContainerFactory.#names.add(name);
	}

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
