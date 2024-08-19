export default DIObjectKey;
export type ParseKeyParentPropType = {
    name: string;
};
export type ParseKeyReturnType = {
    parent: ParseKeyParentPropType;
    name: string;
    lifecycle: number;
    isClass: boolean;
};
/**
 * @typedef {Object} ParseKeyParentPropType
 * @property {string} name
 */
/**
 * @typedef {Object} ParseKeyReturnType
 * @property {ParseKeyParentPropType} parent
 * @property {string} name
 * @property {number} lifecycle
 * @property {boolean} isClass
 */
/** Class representing a key of di object
 * @class
 * @property {string} key
 */
declare class DIObjectKey {
    /**
     *
     * @param {string} key
     */
    constructor(key: string);
    key: string;
    /**
     *
     * @returns {ParseKeyReturnType}
     */
    parseKey(): ParseKeyReturnType;
}
