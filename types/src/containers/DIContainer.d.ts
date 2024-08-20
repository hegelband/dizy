export default DIContainer;
/** Interface for classes that repressent a di container
 * @abstract
 */
declare class DIContainer {
    /** Returns true if there is an instance of di object in DIContainer. */
    hasInstance(): void;
    /** Get an instance of di object. */
    getInstance(): void;
    /** Get parent DIContainer. */
    getParent(): void;
    /** Returns `true` if type of di object with specified key is the same as 'type' argument.
     *
     * @param {string|symbol} key - 'key' of di object
     * @param {any} type - type of di object
     * @returns {boolean}
     */
    typeMatch(key: string | symbol, type: any): boolean;
}
