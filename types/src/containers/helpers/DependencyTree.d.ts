export default DependencyTree;
/** Class representing a dependency tree
 * @class
 */
declare class DependencyTree {
    /**
     * @param {DependencyTreeNode} baseNode
     */
    constructor(baseNode: DependencyTreeNode);
    baseNode: DependencyTreeNode;
    /** Returns all deps with specified height
     *
     * @param {number} height
     * @returns {DependencyTreeNode[]}
     */
    getDepsByHeight(height: number): DependencyTreeNode[];
    /**
     * @typedef {Object} nodesGroupType
     * @property {number} height
     * @property {DependencyTreeNode[]} deps
     */
    /** Returns nodes grouped by height
     *
     * @returns {nodesGroupType[]}
     */
    groupByHeight(): {
        height: number;
        deps: DependencyTreeNode[];
    }[];
    #private;
}
import DependencyTreeNode from "./DependencyTreeNode.js";
