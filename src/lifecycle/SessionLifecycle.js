import Lifecycle from "./Lifecycle.js";
import LifecycleEnum from "../constants/LifecycleEnum.js";

class SessionLifecycle extends Lifecycle {
    constructor(beforeCreate = () => { }, afterCreate = () => { }) {
        super(LifecycleEnum.Session);
        this.beforeCreate = beforeCreate;
        this.afterCreate = afterCreate;
    }
}

export default SessionLifecycle;
