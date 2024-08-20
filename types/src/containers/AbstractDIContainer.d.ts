export default AbstractDIContainer;
/** Abstract Class AbstractDIContainer
 * @abstract
 * @extends {DIContainer}
 * @property {DependencyTree[]} classTreeList
 */
declare class AbstractDIContainer extends DIContainer {
    /**
     * @abstract
     * @param {AbstractDIContainer} parent - parent container
     * @param {DependencyTree[]} [classTreeList=[]] - list of di objects dependency tree
     */
    constructor(parent: AbstractDIContainer, classTreeList?: DependencyTree[]);
    classTreeList: DependencyTree[];
}
import DIContainer from "./DIContainer.js";
import DependencyTree from "./helpers/DependencyTree.js";
