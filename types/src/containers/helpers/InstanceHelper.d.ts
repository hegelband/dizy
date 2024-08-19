export default InstanceHelper;
/** Supporting class for instances */
declare class InstanceHelper {
    /**
     * @static
     * @param {DependencyTreeNode} clazzTreeNode
     * @param {any} argumentValues
     * @returns {Object|FunctionWrapper}
     */
    static createInstance(clazzTreeNode: DependencyTreeNode, argumentValues: any): any | FunctionWrapper;
}
import DependencyTreeNode from "./DependencyTreeNode.js";
import FunctionWrapper from "../../wrappers/FunctionWrapper.js";
