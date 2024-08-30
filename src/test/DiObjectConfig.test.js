import { assert } from "chai";
import { DIObjectConfig } from "../DIObjectConfig.js";

describe("DiObjectConfig", () => {
    describe("new DIObjectConfig()", () => {
        describe("create DIObjectConfig instance with invalid name", () => {
            it(`should throw an error 'DI object name { undefined } is invalid. Name must be a not empty string'`, () => {
                const createDiObjectConfigInstance = () => new DIObjectConfig();
                assert.throws(createDiObjectConfigInstance, Error, "DI object name { undefined } is invalid. Name must be a not empty string");
            });
        });

        describe("create DIObjectConfig instance with invalid type", () => {
            it(`should throw an error 'DI object type { null } is invalid. type prop must be a class or a function'`, () => {
                const createDiObjectConfigInstance = () => new DIObjectConfig('example_name', null);
                assert.throws(createDiObjectConfigInstance, Error, "DI object type { null } is invalid. type prop must be a class or a function");
            });
        });

        describe("create DIObjectConfig instance with invalid lifecycle", () => {
            it(`should throw an error 'Invalid lifecycle { null }. lifecycle prop must be an instance of Lifecycle or it's derived class.'`, () => {
                const createDiObjectConfigInstance = () => new DIObjectConfig('example_name', () => {}, null);
                assert.throws(createDiObjectConfigInstance, Error, "Invalid lifecycle { null }. lifecycle prop must be an instance of Lifecycle or it's derived class.");
            });
        });
    });
});
