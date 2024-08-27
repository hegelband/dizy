import { assert } from "chai";

import AbstractDIContainer from "../containers/AbstractDIContainer.js";
import AbstractContextContainerFactory from "../containers/AbstractContextContainerFactory.js";

describe("AbstractDIContainer", () => {
    const diContainer = new AbstractDIContainer();
    const factory = new AbstractContextContainerFactory();

    describe("new AbstractDIContainer()", () => {
        describe("create AbstractDIContainer without arguments", () => {
            it("should create an instance of AbstractDIContainer with arguments default values", () => {
                const creatAbstractDiContainer = () => new AbstractDIContainer();
                assert.doesNotThrow(creatAbstractDiContainer, Error);
            });
        });

        describe("create AbstractDIContainer with invalid parent", () => {
            it(`should throw an error
				'Invalid di parent. Parent must be an instance of AbstractDIContainer or it's derived class, null or undefined.'
				`, () => {
                const creatAbstractDiContainer = () => new AbstractDIContainer({});
                assert.throws(
                    creatAbstractDiContainer,
                    Error,
                    "Invalid di parent. " + 
                    "Parent must be an instance of AbstractDIContainer or it's derived class, null or undefined.",
                );
            });
        });

        describe("create AbstractDIContainer with invalid classTreeList", () => {
            it(`should throw an error
				'DIContainer constructor's argument 'classTreeList' is invalid. '
                'Argument 'classTreeList' must be an array of DependencyTree instances
				`, () => {
                const creatAbstractDiContainer = () => new AbstractDIContainer(null, {});
                assert.throws(
                    creatAbstractDiContainer,
                    Error,
                    "DIContainer constructor's argument 'classTreeList' is invalid. " +
                    "Argument 'classTreeList' must be an array of DependencyTree instances",
                );
            });
        });
    })
});
