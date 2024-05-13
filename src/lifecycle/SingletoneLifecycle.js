import LifecycleEnum from "../constants/LifecycleEnum.js";
import Lifecycle from "./Lifecycle.js";

class SingletoneLifecycle extends Lifecycle {
	constructor(beforeCreate = () => {}, afterCreate = () => {}) {
		super(LifecycleEnum.Singletone);
		this.beforeCreate = beforeCreate;
		this.afterCreate = afterCreate;
	}
}

export default SingletoneLifecycle;
