import AbstractContextContainer from "./AbstractContextContainer.js";
import { DIObjectConfig } from "../DIObjectConfig.js";
import DIObjectKeyFactory from "./helpers/DIObjectKeyFactory.js";
import InvalidAbstractContextConfig from "../errors/InvalidAbstractContextConfig.js";
import InvalidAbstractContextParent from "../errors/InvalidAbstractContextParent.js";
import InvalidDIObjectKeyFactory from "../errors/InvalidDIObjectKeyFactory.js";

class AbstractContextContainerFactory {
	createContainer(config = [], name = "", parent = null, keyFactory = new DIObjectKeyFactory()) {
		if (AbstractContextContainerFactory.validateContainerParams(config, name, parent, keyFactory)) {
			const context = new AbstractContextContainer(config, name, parent, keyFactory);
			context.setParent(parent);
			return context;
		}
	}

	static validateContainerParams(config, name, parent, keyFactory) {
		if (!Array.isArray(config) || config.find((c) => !(c instanceof DIObjectConfig))) {
			throw new InvalidAbstractContextConfig();
		}
		if (parent !== null && parent !== undefined && !(parent instanceof AbstractContextContainer)) {
			throw new InvalidAbstractContextParent();
		}
		if (!name) {
			throw new Error("Name of Context must be a non empty string.");
		}
		if (!(keyFactory instanceof DIObjectKeyFactory)) {
			throw new InvalidDIObjectKeyFactory();
		}
		return true;
	}
}

export default AbstractContextContainerFactory;
