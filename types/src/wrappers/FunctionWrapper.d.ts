export default FunctionWrapper;
/** Class representing a function that's a di object
 * @class
 */
declare class FunctionWrapper {
    /**
     *
     * @param {import("../DIObjectConfig").callbackType} func
     * @param {any} args - arguments of `func`
     */
    constructor(func: import("../DIObjectConfig").callbackType, args: any);
    func: import("../DIObjectConfig").callbackType;
    args: any;
    /** Calls `func`
     *
     * @returns {any}
     */
    call(): any;
}
