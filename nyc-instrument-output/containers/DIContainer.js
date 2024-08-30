function cov_8y1va334x(){var path="D:\\Programming\\xyz\\dizy\\src\\containers\\DIContainer.js";var hash="7f824cae157dea521dbb85fc75e746245768aac8";var global=new Function("return this")();var gcv="__coverage__";var coverageData={path:"D:\\Programming\\xyz\\dizy\\src\\containers\\DIContainer.js",statementMap:{},fnMap:{"0":{name:"(anonymous_0)",decl:{start:{line:5,column:1},end:{line:5,column:2}},loc:{start:{line:5,column:15},end:{line:5,column:17}},line:5},"1":{name:"(anonymous_1)",decl:{start:{line:8,column:1},end:{line:8,column:2}},loc:{start:{line:8,column:15},end:{line:8,column:17}},line:8},"2":{name:"(anonymous_2)",decl:{start:{line:11,column:1},end:{line:11,column:2}},loc:{start:{line:11,column:15},end:{line:11,column:17}},line:11},"3":{name:"(anonymous_3)",decl:{start:{line:14,column:1},end:{line:14,column:2}},loc:{start:{line:14,column:13},end:{line:14,column:15}},line:14},"4":{name:"(anonymous_4)",decl:{start:{line:23,column:1},end:{line:23,column:2}},loc:{start:{line:23,column:22},end:{line:25,column:2}},line:23}},branchMap:{},s:{},f:{"0":0,"1":0,"2":0,"3":0,"4":0},b:{},_coverageSchema:"1a1c01bbd47fc00a2c39e90264f33305004495a9",hash:"7f824cae157dea521dbb85fc75e746245768aac8"};var coverage=global[gcv]||(global[gcv]={});if(!coverage[path]||coverage[path].hash!==hash){coverage[path]=coverageData;}var actualCoverage=coverage[path];{// @ts-ignore
cov_8y1va334x=function(){return actualCoverage;};}return actualCoverage;}cov_8y1va334x();/** Interface for classes that repressent a di container
 * @abstract
 */class DIContainer{constructor(){cov_8y1va334x().f[0]++;}/** Returns true if there is an instance of di object in DIContainer. */hasInstance(){cov_8y1va334x().f[1]++;}/** Get an instance of di object. */getInstance(){cov_8y1va334x().f[2]++;}/** Get parent DIContainer. */getParent(){cov_8y1va334x().f[3]++;}/** Returns `true` if type of di object with specified key is the same as 'type' argument.
	 *
	 * @param {string|symbol} key - 'key' of di object
	 * @param {any} type - type of di object
	 * @returns {boolean}
	 */ // eslint-disable-next-line no-unused-vars
typeMatch(key,type){cov_8y1va334x().f[4]++;}// is DI object with key instance of type
}export default DIContainer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfOHkxdmEzMzR4IiwiYWN0dWFsQ292ZXJhZ2UiLCJESUNvbnRhaW5lciIsImNvbnN0cnVjdG9yIiwiZiIsImhhc0luc3RhbmNlIiwiZ2V0SW5zdGFuY2UiLCJnZXRQYXJlbnQiLCJ0eXBlTWF0Y2giLCJrZXkiLCJ0eXBlIl0sInNvdXJjZXMiOlsiRElDb250YWluZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqIEludGVyZmFjZSBmb3IgY2xhc3NlcyB0aGF0IHJlcHJlc3NlbnQgYSBkaSBjb250YWluZXJcclxuICogQGFic3RyYWN0XHJcbiAqL1xyXG5jbGFzcyBESUNvbnRhaW5lciB7XHJcblx0Y29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHQvKiogUmV0dXJucyB0cnVlIGlmIHRoZXJlIGlzIGFuIGluc3RhbmNlIG9mIGRpIG9iamVjdCBpbiBESUNvbnRhaW5lci4gKi9cclxuXHRoYXNJbnN0YW5jZSgpIHt9XHJcblxyXG5cdC8qKiBHZXQgYW4gaW5zdGFuY2Ugb2YgZGkgb2JqZWN0LiAqL1xyXG5cdGdldEluc3RhbmNlKCkge31cclxuXHJcblx0LyoqIEdldCBwYXJlbnQgRElDb250YWluZXIuICovXHJcblx0Z2V0UGFyZW50KCkge31cclxuXHJcblx0LyoqIFJldHVybnMgYHRydWVgIGlmIHR5cGUgb2YgZGkgb2JqZWN0IHdpdGggc3BlY2lmaWVkIGtleSBpcyB0aGUgc2FtZSBhcyAndHlwZScgYXJndW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ3xzeW1ib2x9IGtleSAtICdrZXknIG9mIGRpIG9iamVjdFxyXG5cdCAqIEBwYXJhbSB7YW55fSB0eXBlIC0gdHlwZSBvZiBkaSBvYmplY3RcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcclxuXHR0eXBlTWF0Y2goa2V5LCB0eXBlKSB7XHJcblx0XHQvLyBpcyBESSBvYmplY3Qgd2l0aCBrZXkgaW5zdGFuY2Ugb2YgdHlwZVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRElDb250YWluZXI7XHJcbiJdLCJtYXBwaW5ncyI6ImcxQ0FlWTtBQUFBQSxhQUFBLFNBQUFBLENBQUEsU0FBQUMsY0FBQSxXQUFBQSxjQUFBLEVBQUFELGFBQUEsR0FmWjtBQUNBO0FBQ0EsR0FDQSxLQUFNLENBQUFFLFdBQVksQ0FDakJDLFdBQVdBLENBQUEsQ0FBRyxDQUFBSCxhQUFBLEdBQUFJLENBQUEsTUFBQyxDQUVmLHdFQUNBQyxXQUFXQSxDQUFBLENBQUcsQ0FBQUwsYUFBQSxHQUFBSSxDQUFBLE1BQUMsQ0FFZixvQ0FDQUUsV0FBV0EsQ0FBQSxDQUFHLENBQUFOLGFBQUEsR0FBQUksQ0FBQSxNQUFDLENBRWYsOEJBQ0FHLFNBQVNBLENBQUEsQ0FBRyxDQUFBUCxhQUFBLEdBQUFJLENBQUEsTUFBQyxDQUViO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUxDLENBTUE7QUFDQUksU0FBU0EsQ0FBQ0MsR0FBRyxDQUFFQyxJQUFJLENBQUUsQ0FBQVYsYUFBQSxHQUFBSSxDQUFBLE1BRXJCLENBREM7QUFFRixDQUVBLGNBQWUsQ0FBQUYsV0FBVyIsImlnbm9yZUxpc3QiOltdfQ==