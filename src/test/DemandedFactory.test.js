import { assert } from "chai";
import DependencyTreeFixture from "./fixtures/DependencyTreeFixture.js";
import DependencyTree from "../containers/helpers/DependencyTree.js";
import DependencyTreeNode from "../containers/helpers/DependencyTreeNode.js"; // eslint-disable-line no-unused-vars
import DemandedFactory from "../containers/DemandedFactory.js";
import ContextContainer from "../containers/ContextContainer.js";
import ContextContainerFactory from "../containers/ContextContainerFactory.js";

describe("DemandedFactory", () => {
	describe("new DemandedFactory()", () => {
		it(
			"should throw an error " +
				"'Invalid demanded factory parent. " +
				"Parent must be an instance of AbstractContextContainer or it's derived class, null or undefined.'",
			() => {
				const funcThrowsError = () => new DemandedFactory();
				assert.throws(
					funcThrowsError,
					Error,
					"Invalid demanded factory parent. " +
						"Parent must be an instance of AbstractContextContainer or it's derived class, null or undefined.",
				);
			},
		);
	});

	describe("new DemandedFactory(context)", () => {
		it("should not throw an error; classTreeList defined with default value = []", () => {
			const funcThrowsError = () => new DemandedFactory(DependencyTreeFixture.context);
			assert.doesNotThrow(
				funcThrowsError,
				Error,
				"DemandedFactory constructor's argument 'classTreeList' is invalid. " +
					"Argument 'classTreeList' must be an array of DependencyTree instances",
			);
			assert.deepEqual(funcThrowsError().classTreeList, []);
		});
	});

	describe("new DemandedFactory(context, [new DependencyTree(demAClazz)])", () => {
		it("should set classTreeList correctly", () => {
			const funcThrowsError = () =>
				new DemandedFactory(DependencyTreeFixture.context, [new DependencyTree(DependencyTreeFixture.demANode)]);
			assert.doesNotThrow(funcThrowsError);
		});
	});

	describe("new DemandedFactory(context, [{ test: 1 }, { test: 2 }])", () => {
		it(
			"should throw an error " +
				"'DemandedFactory constructor's argument 'classTreeList' is invalid. " +
				"Argument 'classTreeList' must be an array of DependencyTree instances'",
			() => {
				const funcThrowsError = () => new DemandedFactory(DependencyTreeFixture.context, [{ test: 1 }, { test: 2 }]);
				assert.throws(
					funcThrowsError,
					Error,
					"DemandedFactory constructor's argument 'classTreeList' is invalid. " +
						"Argument 'classTreeList' must be an array of DependencyTree instances",
				);
			},
		);
	});

	describe("DemandedFactory.createInstance()", () => {
		const clazzTrees = [new DependencyTree(DependencyTreeFixture.demBNode), new DependencyTree(DependencyTreeFixture.demANode)];
		const context = ContextContainerFactory.createContainer(DependencyTreeFixture.diConfig);
		context.init();
		const demandedContainer = new DemandedFactory(context, clazzTrees);
		const instance = context.getInstance(DependencyTreeFixture.demANode.name);

		describe("DemandedFactory.createInstance(key of di object from this container)", () => {
			it(`should return an instance of class A`, () => {
				// const b = new DependencyTreeFixture.demBClazz.type();
				// assert.deepEqual(instance, new DependencyTreeFixture.demAClazz.type(b));
			});
		});

		describe("call DemandedFactory.createInstance(key of di object from this container) two times", () => {
			it(`should return the new instance for each call`, () => {
				const secondInstance = context.getInstance(DependencyTreeFixture.demANode.name);
				assert.notEqual(instance, secondInstance);
				assert.deepEqual(instance, secondInstance);
			});
		});

		describe("DemandedFactory.createInstance(key that doesn't exist in this container)", () => {
			it(`should return undefined`, () => {
				const noInstance = demandedContainer.createInstance("noKey");
				assert.equal(noInstance, undefined);
			});
		});
	});

	// describe("SingletoneContainer.addInstance('stringKey', instance)", function () {
	//     const context = new ContextContainer(DependencyTreeFixture.diConfig);
	//     context.init();
	//     const simpleContainer = new SingletoneContainer(context, []);

	//     it("should throw an error 'Invalid key type. Argument 'key' must be an instance of DIObjectKey class.'", function () {
	//         const funcThrowsError = () => simpleContainer.addInstance('stringKey', new DependencyTreeFixture.derivedClazz.type());
	//         assert.throws(funcThrowsError, Error, `Invalid key type. Argument 'key' must be an instance of DIObjectKey class.`);
	//     });

	//     it("should add an instance (error not thrown)", function () {
	//         const funcThrowsError = () =>
	//				simpleContainer.addInstance(DependencyTreeFixture.derivedNode.key, new DependencyTreeFixture.derivedClazz.type());
	//         assert.doesNotThrow(funcThrowsError, Error);
	//     });
	// });

	describe("DemandedFactory.getParent()", () => {
		it("should return context", () => {
			const context = DependencyTreeFixture.context;
			const demandedContainer = new DemandedFactory(context);
			assert.deepEqual(demandedContainer.getParent(), context);
		});
	});
});
