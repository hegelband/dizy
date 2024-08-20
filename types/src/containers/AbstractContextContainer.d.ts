export default AbstractContextContainer;
/** Abstract Class for context - AbstractContextContainer. It takes config and generates dependency trees, validate it, create
 * @class
 * @abstract
 * @extends AbstractDIContainer
 *
 * @property {DependencyTree[]} classTreeList - list of di objects dependency tree.
 * @property {Map} scopes - Map of Simple DI Containers, like SingletoneContainer, SessionContainer, DemandedFactory.
//  *
//  * @property {boolean} contextReady - Is context ready for work?
//  * @private
//  *
//  * @property {DIClazz[]} clazzes - List of DIObjectClazz.
//  * @private
//  *
//  * @property {Map<AbstractContextContainer>} - Map of AbstractContextContainer.
//  * @private
 */
declare class AbstractContextContainer extends AbstractDIContainer {
    /**
     * @param {DIObjectConfig[]} [config=[]] - list of di objects configs
     * @param {string} [name=""] - name of context
     * @param {AbstractDIContainer} [parent=null] - parent context
     * @param {DIObjectKeyFactory} [keyFactory=new DIObjectKeyFactory()] - Keys Factory
     */
    constructor(config?: DIObjectConfig[], name?: string, parent?: AbstractDIContainer, keyFactory?: DIObjectKeyFactory);
    config: DIObjectConfig[];
    name: string;
    classTreeList: any[];
    scopes: Map<any, any>;
    /** Init context container: validate config, define classTreeList, create and init scopes and children.
     * @public
     */
    public init(): void;
    /** Add new di object to existed context
     * @param {DIObjectConfig} diObjectConfig - config of new di object
     * @example <caption>Usage of addDIObject.</caption>
     * // returns tree
     * context.addDIObject(SingletoneConfig(...));
     * @returns {DependencyTree}
     */
    addDIObject(diObjectConfig: DIObjectConfig): DependencyTree;
    /** Create and add scopes to AbstractContextContainer.#scopes
     * @protected
     */
    protected _createScopes(): void;
    /**
     * @protected
     */
    protected _initScopes(): void;
    /** Returns `true` if context has an instance of di object with specified name.
     * @public
     * @param {string} name - name of di object from this context
     * @returns {boolean}
     */
    public hasInstance(name: string): boolean;
    /** Get an instance of di object with specified name and lifecycleId.
     * @public
     * @param {string|symbol|Function} name - name of di object from this context
     * @param {number} [lifecycleId] - id of Lifecycle
     * @returns {Object|FunctionWrapper|undefined}
     */
    public getInstance(name: string | symbol | Function, lifecycleId?: number): any | FunctionWrapper | undefined;
    /** Find dependency tree by name and lifecycle id of di object.
     * @protected
     * @param {string|symbol|Function} name - name of di object
     * @param {number} [lifecycleId] - di object lifecycle id
     * @returns {DependencyTree|undefined}
     */
    protected _findClassTree(name: string | symbol | Function, lifecycleId?: number): DependencyTree | undefined;
    /** Get parent DIContainer.
     * @public
     * @returns {AbstractContextContainer|null}
     */
    public getParent(): AbstractContextContainer | null;
    /** Set parent of this context and add this context as a child to parent.
     * @public
     * @param {AbstractContextContainer} parent
     */
    public setParent(parent: AbstractContextContainer): void;
    /** Removes reference to parent.
     * @protected
     */
    protected _removeParent(): void;
    /** Get di object instance from child context.
     * @protected
     * @param {string|symbol|Function} name - name of di object from this context
     * @param {number} [lifecycleId] - id of Lifecycle
     * @returns {Object|FunctionWrapper|undefined}
     */
    protected _getChildInstance(name: string | symbol | Function, lifecycleId?: number): any | FunctionWrapper | undefined;
    /** Get children of context.
     * @public
     * @returns {Map<string, AbstractContextContainer>}
     */
    public getChildren(): Map<string, AbstractContextContainer>;
    /** Add child context.
     * @public
     * @param {AbstractContextContainer} childContext
     */
    public addChild(childContext: AbstractContextContainer): void;
    /** Removes child context by it's name.
     * @public
     * @param {string} childName - name of child context
     */
    public deleteChild(childName: string): void;
    /** Get scope by lifecycle id.
     * @abstract
     */
    getScope(lifecycleId: any): void;
    /** Filter dependency tree list by lifecycle id.
     * @public
     * @param {number} lifecycleId
     * @returns {DependencyTree[]}
     */
    public filterClassesByLifecycle(lifecycleId: number): DependencyTree[];
    #private;
}
import AbstractDIContainer from "./AbstractDIContainer.js";
import { DIObjectConfig } from "../DIObjectConfig.js";
import DependencyTree from "./helpers/DependencyTree.js";
import FunctionWrapper from "../wrappers/FunctionWrapper.js";
import DIObjectKeyFactory from "./helpers/DIObjectKeyFactory.js";
