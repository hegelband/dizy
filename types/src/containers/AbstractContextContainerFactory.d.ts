export default AbstractContextContainerFactory;
/** Abstract Class for creation of AbstractContextContainer - AbstractContextContainerFactory.
 *
 * @class
 */
declare class AbstractContextContainerFactory {
    /** Validates container params
     * @static
     * @param {DIObjectConfig[]} [config=[]] - list of di objects configs
     * @param {string} [name=""] - name of context
     * @param {AbstractContextContainer} [parent=null] - parent context
     * @param {DIObjectKeyFactory} [keyFactory=new DIObjectKeyFactory()] - Keys Factory
     * @returns {boolean}
     */
    static validateContainerParams(config?: DIObjectConfig<any>[], name?: string, parent?: AbstractContextContainer, keyFactory?: DIObjectKeyFactory): boolean;
    /** Returns new AbstractContextContainer.
     * @param {DIObjectConfig[]} [config=[]] - list of di objects configs
     * @param {string} [name=""] - name of context
     * @param {AbstractContextContainer} [parent=null] - parent context
     * @param {DIObjectKeyFactory} [keyFactory=new DIObjectKeyFactory()] - Keys Factory
     * @returns {AbstractContextContainer}
     */
    createContainer(config?: DIObjectConfig<any>[], name?: string, parent?: AbstractContextContainer, keyFactory?: DIObjectKeyFactory): AbstractContextContainer;
}
import { DIObjectConfig } from "../DIObjectConfig.js";
import AbstractContextContainer from "./AbstractContextContainer.js";
import DIObjectKeyFactory from "./helpers/DIObjectKeyFactory.js";
