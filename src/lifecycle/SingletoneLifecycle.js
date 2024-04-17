import Lifecycle from "./Lifecycle";
import LifecycleEnum from "../constants/LifecycleEnum";

class SingletoneLifecycle extends Lifecycle {
    constructor(beforeCreate = () => { }, afterCreate = () => { }) {
        super(LifecycleEnum.Singletone);
        this.beforeCreate = beforeCreate;
        this.afterCreate = afterCreate;
    }
}

export default SingletoneLifecycle;
