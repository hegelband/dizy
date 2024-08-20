export default DependencyTreeNode;
/** Class representing a node of dependency tree
 * @class
 * @extends DIClazz
 * @property {number} height
 * @property {DependencyTreeNode[]} deps
 */
declare class DependencyTreeNode extends DIClazz {
    /**
     *
     * @param {DIClazz} baseClazz
     * @param {number} height
     * @param {DependencyTreeNode[]} deps
     */
    constructor(baseClazz: DIClazz, height: number, deps: DependencyTreeNode[]);
    height: number;
    deps: DependencyTreeNode[];
}
import DIClazz from "../../DIClazz.js";
