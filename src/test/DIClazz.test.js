import { assert } from "chai";
import DIClazz from "../DIClazz.js";
import DIClazzFixture from "./fixtures/DIClazzFixture.js";

describe("DIClazz", () => {
	describe("new DIClazz(null, 'noname', class A, true, new Lifecycle, constructor)", () => {
		it(
			"should throw an error with message " +
				"'DIClazz constructor argument 'key' is invalid. Argument 'key' must not be an undefined, null or boolean.'",
			() => {
				const funcThrowsError = () =>
					new DIClazz(
						null,
						DIClazzFixture.name,
						DIClazzFixture.type,
						DIClazzFixture.isClass,
						DIClazzFixture.lifecycle,
						DIClazzFixture.constructor,
					);
				assert.throws(
					funcThrowsError,
					Error,
					"DIClazz constructor argument 'key' is invalid. Argument 'key' must not be an undefined, null or boolean.",
				);
			},
		);
	});

	describe("new DIClazz((new DIObjectKeyFactory()).createKey(...), {...}, class A, true, new Lifecycle, constructor)", () => {
		it(
			"should throw an error with message " + "'DIClazz constructor argument 'name' is invalid. Argument 'name' type must be a string.'",
			() => {
				const funcThrowsError = () =>
					new DIClazz(
						DIClazzFixture.key,
						{ name: "name" },
						DIClazzFixture.type,
						DIClazzFixture.isClass,
						DIClazzFixture.lifecycle,
						DIClazzFixture.constructor,
					);
				assert.throws(funcThrowsError, Error, "DIClazz constructor argument 'name' is invalid. Argument 'name' type must be a string.");
			},
		);
	});

	describe("new DIClazz((new DIObjectKeyFactory()).createKey(...), 'noname', 'string', true, new Lifecycle, constructor)", () => {
		it(
			"should throw an error with message " +
				"'DIClazz constructor argument 'type' is invalid. Argument 'type' must be a class or a function.'",
			() => {
				const funcThrowsError = () =>
					new DIClazz(
						DIClazzFixture.key,
						DIClazzFixture.name,
						"string",
						DIClazzFixture.isClass,
						DIClazzFixture.lifecycle,
						DIClazzFixture.constructor,
					);
				assert.throws(
					funcThrowsError,
					Error,
					"DIClazz constructor argument 'type' is invalid. Argument 'type' must be a class or a function.",
				);
			},
		);
	});

	describe("new DIClazz((new DIObjectKeyFactory()).createKey(...), 'noname', class A, null, new Lifecycle, constructor)", () => {
		it(
			"should throw an error with message " + "'DIClazz constructor argument 'isClass' is invalid. Argument 'isClass' must be a boolean.'",
			() => {
				const funcThrowsError = () =>
					new DIClazz(
						DIClazzFixture.key,
						DIClazzFixture.name,
						DIClazzFixture.type,
						null,
						DIClazzFixture.lifecycle,
						DIClazzFixture.constructor,
					);
				assert.throws(
					funcThrowsError,
					Error,
					"DIClazz constructor argument 'isClass' is invalid. Argument 'isClass' must be a boolean.",
				);
			},
		);
	});

	describe("new DIClazz((new DIObjectKeyFactory()).createKey(...), 'noname', class A, true, {...}, constructor)", () => {
		it(
			"should throw an error with message " +
				"'DIClazz constructor argument 'lifecycle' is invalid. Argument 'lifecycle' must be an instance of Lifecycle.'",
			() => {
				const funcThrowsError = () =>
					new DIClazz(
						DIClazzFixture.key,
						DIClazzFixture.name,
						DIClazzFixture.type,
						DIClazzFixture.isClass,
						{ a: 1 },
						DIClazzFixture.constructor,
					);
				assert.throws(
					funcThrowsError,
					Error,
					"DIClazz constructor argument 'lifecycle' is invalid. Argument 'lifecycle' must be an instance of Lifecycle.",
				);
			},
		);
	});

	describe("new DIClazz((new DIObjectKeyFactory()).createKey(...), 'noname', class A, true, new Lifecycle, constructor)", () => {
		it("should set it's own properties correctly", () => {
			const clazz = new DIClazz(
				DIClazzFixture.key,
				DIClazzFixture.name,
				DIClazzFixture.type,
				DIClazzFixture.isClass,
				DIClazzFixture.lifecycle,
				DIClazzFixture.constructor,
			);
			// check that all properties have been set correctly
			assert.deepEqual(clazz, DIClazzFixture);
		});
	});
});
