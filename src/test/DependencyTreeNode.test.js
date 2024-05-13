import { assert } from "chai";
import DependencyTreeNode from "../containers/helpers/DependencyTreeNode.js";
import DependencyTreeFixture from "./fixtures/DependencyTreeFixture.js";
import DIObjectKey from "../containers/helpers/DIObjectKey.js";

describe("DependencyTreeNode", () => {
	describe("new DependencyTreeNode()", () => {
		it("create DependencyTreeNode without arguments will throw an error", () => {
			const funcThrowsError = () => new DependencyTreeNode();
			assert.throws(
				funcThrowsError,
				Error,
				"DependencyTreeNode 'baseClazz' is invalid. Constructor argument 'baseClazz' must be a DIClazz instance.",
			);
		});

		it("create DependencyTreeNode with 'height' that's not a number will throw an error", () => {
			const funcThrowsError = () => new DependencyTreeNode(DependencyTreeFixture.baseClazz, "0", []);
			assert.throws(
				funcThrowsError,
				Error,
				`DependencyTreeNode 'height' is invalid (type - string). Constructor argument 'height' must be a number`,
			);
		});

		it("create DependencyTreeNode with 'deps' that's an array of not DependencyTreeNode instances will throw an error", () => {
			const funcThrowsError = () => new DependencyTreeNode(DependencyTreeFixture.baseClazz, 0, [{ test: 1 }]);
			assert.throws(
				funcThrowsError,
				Error,
				"DependencyTreeNode 'deps' is invalid. Constructor argument 'deps' must be an array of DependencyTreeNode instances.",
			);
		});

		it("DependencyTreeNode with valid arguments should set it's own properties correctly", () => {
			const baseNode = new DependencyTreeNode(DependencyTreeFixture.baseClazz, 0, [
				new DependencyTreeNode(DependencyTreeFixture.derivedClazz, 1, []),
			]);
			// check that all properties have been set correctly like in a DIClazz.test.js
			assert.instanceOf(baseNode.key, DIObjectKey);
			assert.typeOf(baseNode.name, "string");
			assert.equal(baseNode.height, 0);
			assert.equal(baseNode.deps[0].height, 1);
		});
	});
});
