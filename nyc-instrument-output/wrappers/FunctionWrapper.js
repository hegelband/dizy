function cov_jsipopr1v(){var path="D:\\Programming\\xyz\\dizy\\src\\wrappers\\FunctionWrapper.js";var hash="dc2461f853ec5ac02307f139100e1609d2008f55";var global=new Function("return this")();var gcv="__coverage__";var coverageData={path:"D:\\Programming\\xyz\\dizy\\src\\wrappers\\FunctionWrapper.js",statementMap:{"0":{start:{line:11,column:2},end:{line:11,column:19}},"1":{start:{line:12,column:2},end:{line:12,column:19}},"2":{start:{line:13,column:2},end:{line:13,column:23}},"3":{start:{line:20,column:8},end:{line:25,column:2}},"4":{start:{line:21,column:2},end:{line:23,column:3}},"5":{start:{line:22,column:3},end:{line:22,column:38}},"6":{start:{line:24,column:2},end:{line:24,column:33}}},fnMap:{"0":{name:"(anonymous_0)",decl:{start:{line:10,column:1},end:{line:10,column:2}},loc:{start:{line:10,column:25},end:{line:14,column:2}},line:10},"1":{name:"(anonymous_1)",decl:{start:{line:20,column:8},end:{line:20,column:9}},loc:{start:{line:20,column:20},end:{line:25,column:2}},line:20}},branchMap:{"0":{loc:{start:{line:21,column:2},end:{line:23,column:3}},type:"if",locations:[{start:{line:21,column:2},end:{line:23,column:3}},{start:{line:undefined,column:undefined},end:{line:undefined,column:undefined}}],line:21}},s:{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0},f:{"0":0,"1":0},b:{"0":[0,0]},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"dc2461f853ec5ac02307f139100e1609d2008f55"};var coverage=global[gcv]||(global[gcv]={});if(!coverage[path]||coverage[path].hash!==hash){coverage[path]=coverageData;}var actualCoverage=coverage[path];{// @ts-ignore
cov_jsipopr1v=function(){return actualCoverage;};}return actualCoverage;}cov_jsipopr1v();/** Class representing a function that's a di object
 * @class
 * @template {Function} T
 */class FunctionWrapper{/**
	 * @param {T} func
	 * @param {any} args - arguments of `func`
	 */constructor(func,args){cov_jsipopr1v().f[0]++;cov_jsipopr1v().s[0]++;this.func=func;cov_jsipopr1v().s[1]++;this.args=args;cov_jsipopr1v().s[2]++;this.call.bind(this);}/** Calls `func`
	 *
	 * @returns {any}
	 */call=(cov_jsipopr1v().s[3]++,function(){cov_jsipopr1v().f[1]++;cov_jsipopr1v().s[4]++;if(new.target){cov_jsipopr1v().b[0][0]++;cov_jsipopr1v().s[5]++;return new this.func(...this.args);}else{cov_jsipopr1v().b[0][1]++;}cov_jsipopr1v().s[6]++;return this.func(...this.args);});}export default FunctionWrapper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfanNpcG9wcjF2IiwiYWN0dWFsQ292ZXJhZ2UiLCJGdW5jdGlvbldyYXBwZXIiLCJjb25zdHJ1Y3RvciIsImZ1bmMiLCJhcmdzIiwiZiIsInMiLCJjYWxsIiwiYmluZCIsIm5ldyIsInRhcmdldCIsImIiXSwic291cmNlcyI6WyJGdW5jdGlvbldyYXBwZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqIENsYXNzIHJlcHJlc2VudGluZyBhIGZ1bmN0aW9uIHRoYXQncyBhIGRpIG9iamVjdFxyXG4gKiBAY2xhc3NcclxuICogQHRlbXBsYXRlIHtGdW5jdGlvbn0gVFxyXG4gKi9cclxuY2xhc3MgRnVuY3Rpb25XcmFwcGVyIHtcclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge1R9IGZ1bmNcclxuXHQgKiBAcGFyYW0ge2FueX0gYXJncyAtIGFyZ3VtZW50cyBvZiBgZnVuY2BcclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihmdW5jLCBhcmdzKSB7XHJcblx0XHR0aGlzLmZ1bmMgPSBmdW5jO1xyXG5cdFx0dGhpcy5hcmdzID0gYXJncztcclxuXHRcdHRoaXMuY2FsbC5iaW5kKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0LyoqIENhbGxzIGBmdW5jYFxyXG5cdCAqXHJcblx0ICogQHJldHVybnMge2FueX1cclxuXHQgKi9cclxuXHRjYWxsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKG5ldy50YXJnZXQpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyB0aGlzLmZ1bmMoLi4udGhpcy5hcmdzKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLmZ1bmMoLi4udGhpcy5hcmdzKTtcclxuXHR9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGdW5jdGlvbldyYXBwZXI7XHJcbiJdLCJtYXBwaW5ncyI6ImdpREFlWTtBQUFBQSxhQUFBLFNBQUFBLENBQUEsU0FBQUMsY0FBQSxXQUFBQSxjQUFBLEVBQUFELGFBQUEsR0FmWjtBQUNBO0FBQ0E7QUFDQSxHQUNBLEtBQU0sQ0FBQUUsZUFBZ0IsQ0FDckI7QUFDRDtBQUNBO0FBQ0EsSUFDQ0MsV0FBV0EsQ0FBQ0MsSUFBSSxDQUFFQyxJQUFJLENBQUUsQ0FBQUwsYUFBQSxHQUFBTSxDQUFBLE1BQUFOLGFBQUEsR0FBQU8sQ0FBQSxNQUN2QixJQUFJLENBQUNILElBQUksQ0FBR0EsSUFBSSxDQUFDSixhQUFBLEdBQUFPLENBQUEsTUFDakIsSUFBSSxDQUFDRixJQUFJLENBQUdBLElBQUksQ0FBQ0wsYUFBQSxHQUFBTyxDQUFBLE1BQ2pCLElBQUksQ0FBQ0MsSUFBSSxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3JCLENBRUE7QUFDRDtBQUNBO0FBQ0EsSUFDQ0QsSUFBSSxFQUFBUixhQUFBLEdBQUFPLENBQUEsTUFBRyxVQUFZLENBQUFQLGFBQUEsR0FBQU0sQ0FBQSxNQUFBTixhQUFBLEdBQUFPLENBQUEsTUFDbEIsR0FBSUcsR0FBRyxDQUFDQyxNQUFNLENBQUUsQ0FBQVgsYUFBQSxHQUFBWSxDQUFBLFNBQUFaLGFBQUEsR0FBQU8sQ0FBQSxNQUNmLE1BQU8sSUFBSSxLQUFJLENBQUNILElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQ0MsSUFBSSxDQUFDLENBQ25DLENBQUMsS0FBQUwsYUFBQSxHQUFBWSxDQUFBLFVBQUFaLGFBQUEsR0FBQU8sQ0FBQSxNQUNELE1BQU8sS0FBSSxDQUFDSCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUNDLElBQUksQ0FBQyxDQUMvQixDQUFDLEVBQ0YsQ0FFQSxjQUFlLENBQUFILGVBQWUiLCJpZ25vcmVMaXN0IjpbXX0=