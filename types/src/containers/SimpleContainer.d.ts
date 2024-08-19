export default SimpleContainer;
/** Abstract Class representing a standard DI container (storage+factory)
 * @class
 * @abstract
 * @extends AbstractDIContainer
 */
declare class SimpleContainer extends AbstractDIContainer {
    /**
     *
     * @param {AbstractContextContainer} parent - parent container
     * @param {DependencyTree[]} [classTreeList=[]] - list of di objects dependency tree
     */
    constructor(parent: AbstractContextContainer, classTreeList?: DependencyTree[]);
    /** Returns new instance of di object.
     * @protected
     * @param {*} clazzTree
     * @returns {Object|FunctionWrapper}
     */
    protected _buildInstance(clazzTree: any): any | FunctionWrapper;
    /**
     * @protected
     */
    protected _addInstance(): void;
    /** Push new di object in `classTreeList`
     * @public
     * @param {DependencyTree} diObjectClazzTree
     */
    public addDIObject(diObjectClazzTree: DependencyTree): void;
}
import AbstractDIContainer from "./AbstractDIContainer.js";
import FunctionWrapper from "../wrappers/FunctionWrapper.js";
import DependencyTree from "./helpers/DependencyTree.js";
import AbstractContextContainer from "./AbstractContextContainer.js";
