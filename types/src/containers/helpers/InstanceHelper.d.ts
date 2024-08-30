export default InstanceHelper;
/** Supporting class for instances */
declare class InstanceHelper {
    /**
     * @static
     * @param {DependencyTreeNode} clazzTreeNode
     * @param {any} argumentValues
     * @returns {Object|Function}
     */
    static createInstance(clazzTreeNode: DependencyTreeNode, argumentValues: any): any | Function;
}
import DependencyTreeNode from "./DependencyTreeNode.js";
