export = getFunctionArgsNames;
declare function getFunctionArgsNames(func: any): {
    startPosition: any;
    args: any[];
};
declare namespace getFunctionArgsNames {
    export { findCloseBraceIndex, splitArgsStrByCommas };
}
declare function findCloseBraceIndex(str: any, startIndex: any): any;
declare function splitArgsStrByCommas(argsStr: any): any[];
