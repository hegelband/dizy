function cov_2dq3pyvb5p(){var path="D:\\Programming\\xyz\\dizy\\src\\containers\\helpers\\InstanceHelper.js";var hash="d80e112819bf8cd618950b9d4709468907d7a414";var global=new Function("return this")();var gcv="__coverage__";var coverageData={path:"D:\\Programming\\xyz\\dizy\\src\\containers\\helpers\\InstanceHelper.js",statementMap:{"0":{start:{line:14,column:2},end:{line:18,column:3}},"1":{start:{line:15,column:3},end:{line:15,column:52}},"2":{start:{line:17,column:3},end:{line:17,column:66}}},fnMap:{"0":{name:"(anonymous_0)",decl:{start:{line:13,column:1},end:{line:13,column:2}},loc:{start:{line:13,column:54},end:{line:19,column:2}},line:13}},branchMap:{"0":{loc:{start:{line:14,column:2},end:{line:18,column:3}},type:"if",locations:[{start:{line:14,column:2},end:{line:18,column:3}},{start:{line:16,column:9},end:{line:18,column:3}}],line:14}},s:{"0":0,"1":0,"2":0},f:{"0":0},b:{"0":[0,0]},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"d80e112819bf8cd618950b9d4709468907d7a414"};var coverage=global[gcv]||(global[gcv]={});if(!coverage[path]||coverage[path].hash!==hash){coverage[path]=coverageData;}var actualCoverage=coverage[path];{// @ts-ignore
cov_2dq3pyvb5p=function(){return actualCoverage;};}return actualCoverage;}cov_2dq3pyvb5p();import FunctionWrapper from"../../wrappers/FunctionWrapper.js";// eslint-disable-next-line no-unused-vars
import DependencyTreeNode from"./DependencyTreeNode.js";/** Supporting class for instances */class InstanceHelper{/**
	 * @static
	 * @param {DependencyTreeNode} clazzTreeNode
	 * @param {any} argumentValues
	 * @returns {Object|FunctionWrapper}
	 */static createInstance(clazzTreeNode,argumentValues){cov_2dq3pyvb5p().f[0]++;cov_2dq3pyvb5p().s[0]++;if(clazzTreeNode.isClass){cov_2dq3pyvb5p().b[0][0]++;cov_2dq3pyvb5p().s[1]++;return new clazzTreeNode.type(...argumentValues);}else{cov_2dq3pyvb5p().b[0][1]++;cov_2dq3pyvb5p().s[2]++;return new FunctionWrapper(clazzTreeNode.type,argumentValues);}}}export default InstanceHelper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMmRxM3B5dmI1cCIsImFjdHVhbENvdmVyYWdlIiwiRnVuY3Rpb25XcmFwcGVyIiwiRGVwZW5kZW5jeVRyZWVOb2RlIiwiSW5zdGFuY2VIZWxwZXIiLCJjcmVhdGVJbnN0YW5jZSIsImNsYXp6VHJlZU5vZGUiLCJhcmd1bWVudFZhbHVlcyIsImYiLCJzIiwiaXNDbGFzcyIsImIiLCJ0eXBlIl0sInNvdXJjZXMiOlsiSW5zdGFuY2VIZWxwZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZ1bmN0aW9uV3JhcHBlciBmcm9tIFwiLi4vLi4vd3JhcHBlcnMvRnVuY3Rpb25XcmFwcGVyLmpzXCI7XHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xyXG5pbXBvcnQgRGVwZW5kZW5jeVRyZWVOb2RlIGZyb20gXCIuL0RlcGVuZGVuY3lUcmVlTm9kZS5qc1wiO1xyXG5cclxuLyoqIFN1cHBvcnRpbmcgY2xhc3MgZm9yIGluc3RhbmNlcyAqL1xyXG5jbGFzcyBJbnN0YW5jZUhlbHBlciB7XHJcblx0LyoqXHJcblx0ICogQHN0YXRpY1xyXG5cdCAqIEBwYXJhbSB7RGVwZW5kZW5jeVRyZWVOb2RlfSBjbGF6elRyZWVOb2RlXHJcblx0ICogQHBhcmFtIHthbnl9IGFyZ3VtZW50VmFsdWVzXHJcblx0ICogQHJldHVybnMge09iamVjdHxGdW5jdGlvbldyYXBwZXJ9XHJcblx0ICovXHJcblx0c3RhdGljIGNyZWF0ZUluc3RhbmNlKGNsYXp6VHJlZU5vZGUsIGFyZ3VtZW50VmFsdWVzKSB7XHJcblx0XHRpZiAoY2xhenpUcmVlTm9kZS5pc0NsYXNzKSB7XHJcblx0XHRcdHJldHVybiBuZXcgY2xhenpUcmVlTm9kZS50eXBlKC4uLmFyZ3VtZW50VmFsdWVzKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBuZXcgRnVuY3Rpb25XcmFwcGVyKGNsYXp6VHJlZU5vZGUudHlwZSwgYXJndW1lbnRWYWx1ZXMpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5zdGFuY2VIZWxwZXI7XHJcbiJdLCJtYXBwaW5ncyI6IjZvQ0FlWTtBQUFBQSxjQUFBLFNBQUFBLENBQUEsU0FBQUMsY0FBQSxXQUFBQSxjQUFBLEVBQUFELGNBQUEsR0FmWixNQUFPLENBQUFFLGVBQWUsS0FBTSxtQ0FBbUMsQ0FDL0Q7QUFDQSxNQUFPLENBQUFDLGtCQUFrQixLQUFNLHlCQUF5QixDQUV4RCxxQ0FDQSxLQUFNLENBQUFDLGNBQWUsQ0FDcEI7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQ0MsTUFBTyxDQUFBQyxjQUFjQSxDQUFDQyxhQUFhLENBQUVDLGNBQWMsQ0FBRSxDQUFBUCxjQUFBLEdBQUFRLENBQUEsTUFBQVIsY0FBQSxHQUFBUyxDQUFBLE1BQ3BELEdBQUlILGFBQWEsQ0FBQ0ksT0FBTyxDQUFFLENBQUFWLGNBQUEsR0FBQVcsQ0FBQSxTQUFBWCxjQUFBLEdBQUFTLENBQUEsTUFDMUIsTUFBTyxJQUFJLENBQUFILGFBQWEsQ0FBQ00sSUFBSSxDQUFDLEdBQUdMLGNBQWMsQ0FBQyxDQUNqRCxDQUFDLElBQU0sQ0FBQVAsY0FBQSxHQUFBVyxDQUFBLFNBQUFYLGNBQUEsR0FBQVMsQ0FBQSxNQUNOLE1BQU8sSUFBSSxDQUFBUCxlQUFlLENBQUNJLGFBQWEsQ0FBQ00sSUFBSSxDQUFFTCxjQUFjLENBQUMsQ0FDL0QsQ0FDRCxDQUNELENBRUEsY0FBZSxDQUFBSCxjQUFjIiwiaWdub3JlTGlzdCI6W119