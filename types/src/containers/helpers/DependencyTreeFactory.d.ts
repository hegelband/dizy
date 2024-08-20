export default DependencyTreeFactory;
/** Class representing a factory for dependency trees
 * @class
 */
declare class DependencyTreeFactory {
    /** Returns new `DependencyTree` instance
     * @static
     * @param {DIClazz} baseClazz
     * @param {DIClazz[]} allClasses
     * @returns {DependencyTree}
     */
    static createDependencyTree(baseClazz: DIClazz, allClasses: DIClazz[]): DependencyTree;
    static "__#3@#addDependencyToNode"(node: any, dep: any): void;
    static "__#3@#buildDependencyTree"(node: any, allClasses: any): any;
}
import DIClazz from "../../DIClazz.js";
import DependencyTree from "./DependencyTree.js";
