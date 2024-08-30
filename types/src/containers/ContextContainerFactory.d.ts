export default ContextContainerFactory;
/** Class for creation of ContextContainer - ContextContainerFactory.
 *
 * @class
 * @extends AbstractContextContainerFactory
 */
declare class ContextContainerFactory extends AbstractContextContainerFactory {
    static "__#8@#names": Set<any>;
    static "__#8@#addName"(name: any): void;
    /** Returns new ContextContainer.
     * @static
     * @param {DIObjectConfig[]} [config=[]] - list of di objects configs
     * @param {string} [name=""] - name of context
     * @param {ContextContainer} [parent=null] - parent context
     * @param {DIObjectKeyFactory} [keyFactory=new DIObjectKeyFactory()] - Keys Factory
     * @returns {ContextContainer}
     */
    static createContainer(config?: DIObjectConfig<any>[], name?: string, parent?: ContextContainer, keyFactory?: DIObjectKeyFactory): ContextContainer;
}
import AbstractContextContainerFactory from "./AbstractContextContainerFactory.js";
import { DIObjectConfig } from "../DIObjectConfig.js";
import ContextContainer from "./ContextContainer.js";
import DIObjectKeyFactory from "./helpers/DIObjectKeyFactory.js";
