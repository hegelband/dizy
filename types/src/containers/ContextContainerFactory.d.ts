export default ContextContainerFactory;
/** Class for creation of ContextContainer - ContextContainerFactory.
 *
 * @class
 * @extends AbstractContextContainerFactory
 */
declare class ContextContainerFactory extends AbstractContextContainerFactory {
    static "__#8@#names": Set<any>;
    static "__#8@#addName"(name: any): void;
    /** Returns new AbstractContextContainer.
     * @static
     * @param {DIObjectConfig[]} [config=[]] - list of di objects configs
     * @param {string} [name=""] - name of context
     * @param {AbstractDIContainer} [parent=null] - parent context
     * @param {DIObjectKeyFactory} [keyFactory=new DIObjectKeyFactory()] - Keys Factory
     * @returns {ContextContainer}
     */
    static createContainer(config?: DIObjectConfig[], name?: string, parent?: AbstractDIContainer, keyFactory?: DIObjectKeyFactory): ContextContainer;
}
import AbstractContextContainerFactory from "./AbstractContextContainerFactory.js";
import DIObjectKeyFactory from "./helpers/DIObjectKeyFactory.js";
import ContextContainer from "./ContextContainer.js";
