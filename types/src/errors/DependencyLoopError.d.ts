export default DependencyLoopError;
declare class DependencyLoopError extends Error {
    constructor(first: any, second: any);
}
