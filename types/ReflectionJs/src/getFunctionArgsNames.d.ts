export = getFunctionArgsNames;
/**
 * @typedef { Object } ParsedArgumentsType
 * @property { number } startPosition
 * @property { string[] } args - constructor stringified args commas separated
 */
/**
 *
 * @param {function} func
 * @returns {ParsedArgumentsType}
 */
declare function getFunctionArgsNames(func: Function): ParsedArgumentsType;
declare namespace getFunctionArgsNames {
    export { findCloseBraceIndex, splitArgsStrByCommas, ParsedArgumentsType };
}
/** Returns closing brace index
 *
 * @param {string} str
 * @param {number} startIndex
 * @returns {number}
 */
declare function findCloseBraceIndex(str: string, startIndex: number): number;
/**	Returns arguments stringified by toString
 *
 * @param {string} argsStr
 * @returns {string[]}
 */
declare function splitArgsStrByCommas(argsStr: string): string[];
type ParsedArgumentsType = {
    startPosition: number;
    /**
     * - constructor stringified args commas separated
     */
    args: string[];
};
