import Lifecycle from "./Lifecycle.js";
import LifecycleEnum from "../constants/LifecycleEnum.js";

class SingletoneLifecycle extends Lifecycle {
    constructor(beforeCreate = () => { }, afterCreate = () => { }) {
        super(LifecycleEnum.Singletone);
        this.beforeCreate = beforeCreate;
        this.afterCreate = afterCreate;
    }
}

export default SingletoneLifecycle;
