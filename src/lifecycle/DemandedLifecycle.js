import LifecycleEnum from "../constants/LifecycleEnum.js";
import Lifecycle from "./Lifecycle.js";

class DemandedLifecycle extends Lifecycle {
	constructor(beforeCreate = () => {}, afterCreate = () => {}) {
		super(LifecycleEnum.Demanded);
		this.beforeCreate = beforeCreate;
		this.afterCreate = afterCreate;
	}
}

export default DemandedLifecycle;
