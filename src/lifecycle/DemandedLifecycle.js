import Lifecycle from "./Lifecycle";
import LifecycleEnum from "../constants/LifecycleEnum";

class DemandedLifecycle extends Lifecycle {
    constructor(beforeCreate = () => { }, afterCreate = () => { }) {
        super(LifecycleEnum.Demanded);
        this.beforeCreate = beforeCreate;
        this.afterCreate = afterCreate;
    }
}

export default DemandedLifecycle;
