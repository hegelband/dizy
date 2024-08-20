export default DIClazz;
/** Supporting class for di object
 * @class
 */
declare class DIClazz {
    /**
     *
     * @param {string|symbol|number|object} key
     * @param {string} name
     * @param {import("./DIObjectConfig.js").callbackType} type
     * @param {boolean} isClass
     * @param {Lifecycle} lifecycle
     * @param {{args: string[]}} constructor
     */
    constructor(key: string | symbol | number | object, name: string, type: import("./DIObjectConfig.js").callbackType, isClass: boolean, lifecycle: Lifecycle, constructor: {
        args: string[];
    });
    key: any;
    name: string;
    type: import("./DIObjectConfig.js").callbackType;
    isClass: boolean;
    lifecycle: Lifecycle;
}
import Lifecycle from "./lifecycle/Lifecycle.js";
