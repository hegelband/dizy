import { assert } from "chai";
import DIObjectKey from "../containers/helpers/DIObjectKey.js";

describe("DIObjectKey", () => {
	describe("new DIObjectKey()", () => {
		it("create DIObjectKey instance with no arg", () => {
			const funcThrowsError = () => new DIObjectKey();
			assert.throws(
				funcThrowsError,
				Error,
				"DIObjectKey constructor argument ('key' = undefined (type - undefined)) is invalid.\n" +
					"Argument 'key' must be a string like '@{parentName}/{DIObjectName}/{lifecycleId}/{isClass}'",
			);
		});

		it("create DIObjectKey instance with invalid string", () => {
			const funcThrowsError = () => new DIObjectKey("@parent/noname/test/true");
			assert.throws(
				funcThrowsError,
				Error,
				"DIObjectKey constructor argument ('key' = @parent/noname/test/true (type - string)) is invalid.\n" +
					"Argument 'key' must be a string like '@{parentName}/{DIObjectName}/{lifecycleId}/{isClass}'",
			);
		});

		it("create DIObjectKey instance with valid string", () => {
			assert.equal(new DIObjectKey("@parent/noname/3/true").key, "@parent/noname/3/true");
		});
	});

	describe("DIObjectKey.parseKey()", () => {
		it("DIObjectKey with key '@parent/noname/3/true')", () => {
			assert.deepEqual(new DIObjectKey("@parent/noname/3/true").parseKey(), {
				parent: {
					name: "parent",
				},
				name: "noname",
				lifecycle: 3,
				isClass: true,
			});
		});
	});
});
