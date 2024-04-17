import Lifecycle from "./Lifecycle";
import LifecycleEnum from "../constants/LifecycleEnum";

class SessionLifecycle extends Lifecycle {
    constructor(beforeCreate = () => { }, afterCreate = () => { }) {
        super(LifecycleEnum.Session);
        this.beforeCreate = beforeCreate;
        this.afterCreate = afterCreate;
    }
}

export default SessionLifecycle;
