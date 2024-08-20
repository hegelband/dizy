export default SingletoneContainer;
/** Class representing simple DI container with singletone lifecycle
 * @class
 * @extends SimpleContainer
 */
declare class SingletoneContainer extends SimpleContainer {
    /**
     *
     * @param {AbstractContextContainer} parent - parent container
     * @param {DependencyTree[]} [classTreeList=[]] - list of di objects dependency tree
     */
    constructor(parent: AbstractContextContainer, classTreeList?: DependencyTree[]);
    /** Adds new di object
     * @public
     * @param {DependencyTree} diObjectClazzTree
     */
    public addDIObject(diObjectClazzTree: DependencyTree): void;
    /** Adds instance to instancesMap
     * @protected
     * @param {DIObjectKey} key
     * @param {Object|FunctionWrapper} instance
     */
    protected _addInstance(key: DIObjectKey, instance: any | FunctionWrapper): void;
    /** Returns boolean indicating whether an element with the specified key exists or not.
     *
     * @param {DIObjectKey} key
     * @returns {boolean}
     */
    hasInstance(key: DIObjectKey): boolean;
    /**
     *
     * @param {DIObjectKey} key
     * @returns {Object|FunctionWrapper}
     */
    getInstance(key: DIObjectKey): any | FunctionWrapper;
    /** Returns context that's a parent container of this SessionContainer
     *
     * @returns {ContextContainer}
     */
    getParent(): ContextContainer;
    #private;
}
import SimpleContainer from "./SimpleContainer.js";
import DIObjectKey from "./helpers/DIObjectKey.js";
