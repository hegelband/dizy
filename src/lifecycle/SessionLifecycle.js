import LifecycleEnum from "../constants/LifecycleEnum.js";
import Lifecycle from "./Lifecycle.js";

/** Class representing session lifecycle
 * @class
 * @extends Lifecycle
 */
class SessionLifecycle extends Lifecycle {
	/**
	 *
	 * @param {import("../DIObjectConfig.js").callbackType} beforeCreate - will be called before creation of di object's instance
	 * @param {import("../DIObjectConfig.js").callbackType} afterCreate - will be called after creation of di object's instance
	 */
	constructor(beforeCreate = () => {}, afterCreate = () => {}) {
		super(LifecycleEnum.Session);
		this.beforeCreate = beforeCreate;
		this.afterCreate = afterCreate;
	}
}

export default SessionLifecycle;
