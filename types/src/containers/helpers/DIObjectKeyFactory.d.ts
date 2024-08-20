export default DIObjectKeyFactory;
/** Class representing factory for di object keys
 * @class
 */
declare class DIObjectKeyFactory {
    /**
     *
     * @param {Map} [keys=new Map()]
     */
    constructor(keys?: Map<any, any>);
    /** Returns new key string
     *
     * @param {AbstractContextContainer} parent
     * @param {string} name
     * @param {Lifecycle} lifecycle
     * @param {boolean} isClass
     * @returns {string}
     */
    createKey(parent: AbstractContextContainer, name: string, lifecycle: Lifecycle, isClass: boolean): string;
    #private;
}
import AbstractContextContainer from "../AbstractContextContainer.js";
import Lifecycle from "../../lifecycle/Lifecycle.js";
