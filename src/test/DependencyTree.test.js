import { assert } from "chai";
import DependencyTree from "../containers/helpers/DependencyTree.js";
import DependencyTreeFixture from "./fixtures/DependencyTreeFixture.js";

describe("DependencyTree", () => {
	describe("new DependencyTree()", () => {
		it("create DependencyTree instance with no arg", () => {
			const funcThrowsError = () => new DependencyTree();
			assert.throws(
				funcThrowsError,
				Error,
				"DependencyTree baseNode arg is invalid. Constructor argument 'baseNode' must be an instance of DependencyTreeNode",
			);
		});

		it("create DependencyTree instance with valid baseNode", () => {
			const funcThrowsError = () => new DependencyTree(DependencyTreeFixture.baseNode);
			assert.doesNotThrow(
				funcThrowsError,
				Error,
				"DependencyTree baseNode arg is invalid. Constructor argument 'baseNode' must be an instance of DependencyTreeNode",
			);
		});
	});

	describe("DependencyTree.getDepsByHeight()", () => {
		it("getDepsByHeight() without argument will throw an error", () => {
			const classTree = new DependencyTree(DependencyTreeFixture.baseNode);
			const funcThrowsError = () => classTree.getDepsByHeight();
			assert.throws(
				funcThrowsError,
				Error,
				"getDepsByHeight arg 'height' is undefined. Argument 'height' value must be a positive number",
			);
		});

		it("getDepsByHeight(-1) will throw an error", () => {
			const classTree = new DependencyTree(DependencyTreeFixture.baseNode);
			const funcThrowsError = () => classTree.getDepsByHeight(-1);
			assert.throws(
				funcThrowsError,
				Error,
				"getDepsByHeight arg 'height' is a negative number. Argument 'height' value must be a positive number",
			);
		});

		it(`getDepsByHeight(0) returns base node (with name = '${DependencyTreeFixture.baseNode.name}') of deps tree`, () => {
			const classTree = new DependencyTree(DependencyTreeFixture.baseNode);
			const deps = classTree.getDepsByHeight(0);
			assert.equal(deps.length, 1);
			assert.deepEqual(deps[0], DependencyTreeFixture.baseNode);
		});
	});

	describe("DependencyTree.groupByHeight()", () => {
		it(`getDepsByHeight(0) returns base node (with name = '${DependencyTreeFixture.baseNode.name}') of deps tree`, () => {
			const classTree = new DependencyTree(DependencyTreeFixture.baseNode);
			const groups = classTree.groupByHeight();
			assert.deepEqual(groups, [
				{
					height: 0,
					deps: [DependencyTreeFixture.baseNode],
				},
				{
					height: 1,
					deps: [...DependencyTreeFixture.baseNode.deps],
				},
			]);
		});
	});
});
