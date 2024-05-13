import { assert } from "chai";
import DIObjectKeyFactory from "../containers/helpers/DIObjectKeyFactory.js";
import ContextContainer from "../containers/ContextContainer.js";
import SingletoneLifecycle from "../lifecycle/SingletoneLifecycle.js";

describe("DIObjectKeyFactory", () => {
	describe("new DIObjectKeyFactory()", () => {
		it("create DIObjectKeyFactory with no initial keys", () => {
			const funcNotThrownError = () => new DIObjectKeyFactory();
			assert.doesNotThrow(funcNotThrownError, Error);
		});
	});

	describe("DIObjectKeyFactory.create()", () => {
		const keyFactory = new DIObjectKeyFactory();
		const context = new ContextContainer([]);
		const singletoneLifecycle = new SingletoneLifecycle();

		it("create DIObjectKey instance by DIObjectKeyFactory.create() with no args", () => {
			const funcThrowsError = () => keyFactory.createKey();
			assert.throws(
				funcThrowsError,
				Error,
				"DIObjectKeyFactory.create() 'parent' arg is invalid. 'parent' must be an instance of AbstractContextContainer",
			);
		});

		it("create DIObjectKey instance by DIObjectKeyFactory.create() with invalid name type", () => {
			const funcThrowsError = () => keyFactory.createKey(context, 3, singletoneLifecycle, true);
			assert.throws(funcThrowsError, Error, "DIObjectKeyFactory.create() 'name' arg is invalid. 'name' must be a string.");
		});

		it("create DIObjectKey instance by DIObjectKeyFactory.create() with an empty name", () => {
			const funcThrowsError = () => keyFactory.createKey(context, "", singletoneLifecycle, true);
			assert.throws(funcThrowsError, Error, "DIObjectKeyFactory.create() 'name' arg is empty.");
		});

		it("create DIObjectKey instance by DIObjectKeyFactory.create() with invalid lifecycle", () => {
			const funcThrowsError = () => keyFactory.createKey(context, "noname", { id: 3 }, true);
			assert.throws(
				funcThrowsError,
				Error,
				"DIObjectKeyFactory.create() 'lifecycle' arg is invalid. 'lifecycle' must be an instance of Lifecycle",
			);
		});

		it("create DIObjectKey instance by DIObjectKeyFactory.create() with invalid isClass arg", () => {
			const funcThrowsError = () => keyFactory.createKey(context, "noname", singletoneLifecycle, "true");
			assert.throws(funcThrowsError, Error, "DIObjectKeyFactory.create() 'isClass' arg type is invalid. 'isClass' type must be boolean");
		});

		it("create DIObjectKey instance by DIObjectKeyFactory.create() with valid arguments", () => {
			const keyStr = keyFactory.createKey(context, "noname", singletoneLifecycle, true).key;
			assert.equal(keyStr, `@${context.name}/noname/2/true`);
		});
	});
});
