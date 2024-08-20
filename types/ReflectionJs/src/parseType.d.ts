export = parseType;
/**
 * @typedef {'function'|'class'|'function class'|'string'|'number'|'boolean'|'symbol'|'object'|'undefined'} ParseTypeReturnType
 */
/**
 *
 * @param {any} data
 * @returns {ParseTypeReturnType}
 */
declare function parseType(data: any): ParseTypeReturnType;
declare namespace parseType {
    export { ParseTypeReturnType };
}
type ParseTypeReturnType = "function" | "class" | "function class" | "string" | "number" | "boolean" | "symbol" | "object" | "undefined";
