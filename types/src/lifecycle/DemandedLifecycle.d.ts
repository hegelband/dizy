export default DemandedLifecycle;
/** Class representing demanded lifecycle
 * @class
 * @extends Lifecycle
 */
declare class DemandedLifecycle extends Lifecycle {
    /**
     *
     * @param {import("../DIObjectConfig.js").callbackType} beforeCreate - will be called before creation of di object's instance
     * @param {import("../DIObjectConfig.js").callbackType} afterCreate - will be called after creation of di object's instance
     */
    constructor(beforeCreate?: import("../DIObjectConfig.js").callbackType, afterCreate?: import("../DIObjectConfig.js").callbackType);
    beforeCreate: import("../DIObjectConfig.js").callbackType;
    afterCreate: import("../DIObjectConfig.js").callbackType;
}
import Lifecycle from "./Lifecycle.js";
