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
     * @param {AbstractDIContainer} [parent=null] - parent context
     * @param {DIObjectKeyFactory} [keyFactory=new DIObjectKeyFactory()] - Keys Factory
     * @returns {boolean}
     */
    static validateContainerParams(config?: DIObjectConfig[], name?: string, parent?: AbstractDIContainer, keyFactory?: DIObjectKeyFactory): boolean;
    /** Returns new AbstractContextContainer.
     * @param {DIObjectConfig[]} [config=[]] - list of di objects configs
     * @param {string} [name=""] - name of context
     * @param {AbstractDIContainer} [parent=null] - parent context
     * @param {DIObjectKeyFactory} [keyFactory=new DIObjectKeyFactory()] - Keys Factory
     * @returns {AbstractContextContainer}
     */
    createContainer(config?: DIObjectConfig[], name?: string, parent?: AbstractDIContainer, keyFactory?: DIObjectKeyFactory): AbstractContextContainer;
}
import { DIObjectConfig } from "../DIObjectConfig.js";
import DIObjectKeyFactory from "./helpers/DIObjectKeyFactory.js";
import AbstractContextContainer from "./AbstractContextContainer.js";
