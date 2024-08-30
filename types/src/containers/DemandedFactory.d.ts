export default DemandedFactory;
/** Class representing a DI objects factory for objects with demanded lifecycle
 * @class
 */
declare class DemandedFactory {
    /**
     *
     * @param {AbstractContextContainer} parent - parent container
     * @param {DependencyTree[]} [classTreeList=[]] - list of di objects dependency tree
     */
    constructor(parent: AbstractContextContainer, classTreeList?: DependencyTree[]);
    classTreeList: DependencyTree[];
    /** Adds new di object
     * @public
     * @param {DependencyTree} diObjectClazzTree
     */
    public addDIObject(diObjectClazzTree: DependencyTree): void;
    /** Creates new instance of di object
     *
     * @param {DIObjectKey} key
     * @returns {Object|Function}
     */
    createInstance(key: DIObjectKey): any | Function;
    /** Returns context that's a parent container of this SessionContainer
     *
     * @returns {ContextContainer}
     */
    getParent(): ContextContainer;
    #private;
}
import DependencyTree from "./helpers/DependencyTree.js";
import DIObjectKey from "./helpers/DIObjectKey.js";
import AbstractContextContainer from "./AbstractContextContainer.js";
