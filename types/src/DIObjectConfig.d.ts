/** @callback callbackType */
/** Class representing an error thrown when `name` of DIObjectConfig is invalid.
 * @class
 * @extends Error
 */
export class InvalidDIObjectName extends Error {
    constructor(name: any);
}
/** Class representing an error thrown when `parent` of DIObjectConfig is invalid.
 * @class
 * @extends Error
 */
export class InvalidDIObjectParent extends Error {
    constructor();
}
/** Class representing an error thrown when `lifecycle` of DIObjectConfig is unregistered.
 * @class
 * @extends Error
 */
export class UnregisteredDIObjectLifecycle extends Error {
    constructor(lifecycle: any);
}
/** Class representing an error thrown when `lifecycle` of DIObjectConfig is invalid.
 * @class
 * @extends Error
 */
export class InvalidDIObjectLifecycle extends Error {
    constructor(lifecycle: any);
}
/** Class representing an error thrown when `type` of DIObjectConfig is invalid.
 * @class
 * @extends Error
 */
export class InvalidDIObjectType extends Error {
    constructor(type: any);
}
/** Abstract Class representint di object config.
 * @class
 * @abstract
 * @template {Function} T
 */
export class DIObjectConfig<T extends Function> {
    /**
     * @constructor
     * @param {string|symbol} name
     * @param {T} type
     * @param {Lifecycle} lifecycle
     */
    constructor(name: string | symbol, type: T, lifecycle: Lifecycle);
    name: string | symbol;
    type: T;
    lifecycle: Lifecycle;
}
/** Class representing a config of di object with demanded lifecycle
 * @class
 * @property {DemandedLifecycle} lifecycle
 */
export class DemandedConfig extends DIObjectConfig<any> {
    /**
     *
     * @param {string|symbol} name
     * @param {callbackType} type
     * @param {callbackType} [beforeCreate=()=>{}]
     * @param {callbackType} [afterCreate=()=>{}]
     */
    constructor(name?: string | symbol, type?: callbackType, beforeCreate?: callbackType, afterCreate?: callbackType);
}
/** Class representing a config of di object with singletone lifecycle
 * @class
 * @property {SingletoneLifecycle} lifecycle
 */
export class SingletoneConfig extends DIObjectConfig<any> {
    /**
     *
     * @param {string|symbol} name
     * @param {callbackType} type
     * @param {callbackType} [beforeCreate=()=>{}]
     * @param {callbackType} [afterCreate=()=>{}]
     */
    constructor(name?: string | symbol, type?: callbackType, beforeCreate?: callbackType, afterCreate?: callbackType);
}
/** Class representing a config of di object with session lifecycle
 * @class
 * @property {SessionLifecycle} lifecycle
 */
export class SessionConfig extends DIObjectConfig<any> {
    /**
     *
     * @param {string|symbol} name
     * @param {callbackType} type
     * @param {callbackType} [beforeCreate=()=>{}]
     * @param {callbackType} [afterCreate=()=>{}]
     */
    constructor(name?: string | symbol, type?: callbackType, beforeCreate?: callbackType, afterCreate?: callbackType);
}
export type callbackType = () => any;
import Lifecycle from "./lifecycle/Lifecycle.js";
