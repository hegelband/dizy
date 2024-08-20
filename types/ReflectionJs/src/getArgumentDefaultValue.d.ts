export = getArgumentDefaultValue;
/**
 * @typedef {Object} GetArgumentDefaultValueReturnType
 * @property {string} name
 * @property {string|undefined} value
 */
/** Returns name and default value of argument
 *
 * @param {string} argStr - part of string returned by toString method of function
 * @returns {GetArgumentDefaultValueReturnType}
 */
declare function getArgumentDefaultValue(argStr: string): GetArgumentDefaultValueReturnType;
declare namespace getArgumentDefaultValue {
    export { GetArgumentDefaultValueReturnType };
}
type GetArgumentDefaultValueReturnType = {
    name: string;
    value: string | undefined;
};
