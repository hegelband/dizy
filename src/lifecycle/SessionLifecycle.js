import LifecycleEnum from "../constants/LifecycleEnum.js";
import Lifecycle from "./Lifecycle.js";

class SessionLifecycle extends Lifecycle {
	constructor(beforeCreate = () => {}, afterCreate = () => {}) {
		super(LifecycleEnum.Session);
		this.beforeCreate = beforeCreate;
		this.afterCreate = afterCreate;
	}
}

export default SessionLifecycle;
