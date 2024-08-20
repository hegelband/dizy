export = getClassConstructorArgsNames;
/**
 * @typedef {Object} ParsedArgumentsType
 * @property {number} startPosition
 * @property {string[]} args - constructor stringified args commas separated
 */
/** Returns class constructor arguments
 *
 * @param {function} cls - class
 * @returns {ParsedArgumentsType}
 */
declare function getClassConstructorArgsNames(cls: Function): ParsedArgumentsType;
declare namespace getClassConstructorArgsNames {
    export { ParsedArgumentsType };
}
type ParsedArgumentsType = {
    startPosition: number;
    /**
     * - constructor stringified args commas separated
     */
    args: string[];
};
