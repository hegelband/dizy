export default ContextContainer;
/** Class for context - ContextContainer.
 * It takes config and generates dependency trees, validates it, creates scopes and allow to get instances
 * @class
 * @extends AbstractContextContainer
 */
declare class ContextContainer extends AbstractContextContainer {
    /**
     *
     * @param {DIObjectConfig[]} [config=[]]
     * @param {string} [name=""]
     * @param {ContextContainer} [parent=null]
     * @param {DIObjectKeyFactory} [keyFactory=new DIObjectKeyFactory()]
     */
    constructor(config?: DIObjectConfig<any>[], name?: string, parent?: ContextContainer, keyFactory?: DIObjectKeyFactory);
    /** Add DI Object to this context
     * @public
     * @param {SingletoneConfig|SessionConfig|DemandedConfig} diObjectConfig - config of new di object
     * @returns {boolean}
     */
    public addDIObject(diObjectConfig: SingletoneConfig | SessionConfig | DemandedConfig): boolean;
    /** Returns `true` if context has di object with specified name.
     * @public
     * @param {string|symbol|Function} name - name of di object from this context
     * @returns {boolean}
     */
    public hasDIObject(name: string | symbol | Function): boolean;
    /** Returns `true` if context has an instance of di object with specified name.
     * @public
     * @param {string|symbol|Function} name - name of di object from this context
     * @returns {boolean}
     */
    public hasInstance(name: string | symbol | Function): boolean;
    /**
     * @template T
     * @typedef {T extends abstract new (...args: any[]) => infer P ? P : T extends Function ? T : any} GetInstanceReturnType<T>
     */
    /** Get an instance of di object with specified name and lifecycleId.
     * @public
     * @template {string | symbol | Function} T
     * @param {T} name - name of di object from this context
     * @param {number} [lifecycleId] - id of Lifecycle
     * @param {boolean} [calledFromScope] - true only if this method is called from scope
     * @returns {GetInstanceReturnType<T>}
     */
    public getInstance<T extends string | symbol | Function>(name: T, lifecycleId?: number, calledFromScope?: boolean): T extends abstract new (...args: any[]) => infer P ? P : T extends Function ? T : any;
    /** Returns a proxy `diObjectType`, that changes constructor (new diObjectType() = context.getInstance(diObjectType))
     * @public
     * @template {Function} T
     * @param {T} diObjectType
     * @returns {GetInstanceReturnType<T>}
     */
    public getDIObjectProxy<T extends Function>(diObjectType: T): T extends abstract new (...args: any[]) => infer P ? P : T extends Function ? T : any;
    /** Returns `true` if type of di object with specified key is the same as 'type' argument.
     * @public
     * @param {string|symbol} key - 'key' of di object
     * @param {any} type - type of di object
     * @returns {boolean}
     */
    public typeMatch(name: any, type: any): boolean;
    /** Get scope by lifecycle id.
     * @public
     * @param {number} lifecycleId - id of Lifecycle
     * @returns {SingletoneContainer|SessionContainer|DemandedFactory}
     */
    public getScope(lifecycleId: number): SingletoneContainer | SessionContainer | DemandedFactory;
}
import AbstractContextContainer from "./AbstractContextContainer.js";
import { SingletoneConfig } from "../DIObjectConfig.js";
import { SessionConfig } from "../DIObjectConfig.js";
import { DemandedConfig } from "../DIObjectConfig.js";
import SingletoneContainer from "./SingletoneContainer.js";
import SessionContainer from "./SessionContainer.js";
import DemandedFactory from "./DemandedFactory.js";
import { DIObjectConfig } from "../DIObjectConfig.js";
import DIObjectKeyFactory from "./helpers/DIObjectKeyFactory.js";
