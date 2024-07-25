import { assert } from "chai";
import DependencyTreeFixture from "./fixtures/DependencyTreeFixture.js";
import DependencyTree from "../containers/helpers/DependencyTree.js";
import DependencyTreeNode from "../containers/helpers/DependencyTreeNode.js";
import SingletoneContainer from "../containers/SingletoneContainer.js";
import ContextContainer from "../containers/ContextContainer.js";
import ContextContainerFactory from "../containers/ContextContainerFactory.js";

describe("SingletoneContainer", () => {
	describe("new SingletoneContainer()", () => {
		it(
			"should throw an error " +
				"'Invalid simple container parent. " +
				"Parent must be an instance of AbstractContextContainer or it's derived class, null or undefined.'",
			() => {
				const funcThrowsError = () => new SingletoneContainer();
				assert.throws(
					funcThrowsError,
					Error,
					"Invalid simple container parent. " +
						"Parent must be an instance of AbstractContextContainer or it's derived class, null or undefined.",
				);
			},
		);
	});

	describe("new SingletoneContainer(context)", () => {
		it("should not throw an error; classTreeList defined with default value = []", () => {
			const funcThrowsError = () => new SingletoneContainer(DependencyTreeFixture.context);
			assert.doesNotThrow(
				funcThrowsError,
				Error,
				"DIContainer constructor's argument 'classTreeList' is invalid. " +
					"Argument 'classTreeList' must be an array of DependencyTree instances",
			);
			assert.deepEqual(funcThrowsError().classTreeList, []);
		});
	});

	describe("new SingletoneContainer(context, [new DependencyTree(baseNode)])", () => {
		it("should set classTreeList correctly", () => {
			const funcThrowsError = () =>
				new SingletoneContainer(DependencyTreeFixture.context, [new DependencyTree(DependencyTreeFixture.baseNode)]);
			assert.doesNotThrow(
				funcThrowsError,
				Error,
				"DIContainer constructor's argument 'classTreeList' is invalid. " +
					"Argument 'classTreeList' must be an array of DependencyTree instances",
			);
		});
	});

	describe("new SingletoneContainer(context, [{ test: 1 }, { test: 2 }])", () => {
		it(
			"should throw an error " +
				"'DIContainer constructor's argument 'classTreeList' is invalid. " +
				"Argument 'classTreeList' must be an array of DependencyTree instances'",
			() => {
				const funcThrowsError = () => new SingletoneContainer(DependencyTreeFixture.context, [{ test: 1 }, { test: 2 }]);
				assert.throws(
					funcThrowsError,
					Error,
					"DIContainer constructor's argument 'classTreeList' is invalid. " +
						"Argument 'classTreeList' must be an array of DependencyTree instances",
				);
			},
		);
	});

	describe("SingletoneContainer.getInstance()", () => {
		const clazzTrees = [
			new DependencyTree(DependencyTreeFixture.baseNode),
			new DependencyTree(new DependencyTreeNode(DependencyTreeFixture.derivedClazz, 0, [])),
		];
		const context = ContextContainerFactory.createContainer(DependencyTreeFixture.diConfig);
		context.init();
		const simpleContainer = new SingletoneContainer(context, clazzTrees);
		const instance = simpleContainer.getInstance(DependencyTreeFixture.baseNode.key);

		describe("SingletoneContainer.getInstance(key of di object from this container)", () => {
			it(`should return an instance of class A`, () => {
				assert.deepEqual(instance, new DependencyTreeFixture.baseClazz.type(new DependencyTreeFixture.derivedClazz.type()));
			});
		});

		describe("call SingletoneContainer.getInstance(key of di object from this container) two times", () => {
			it(`should return the same instance for each call`, () => {
				const secondInstance = simpleContainer.getInstance(DependencyTreeFixture.baseNode.key);
				assert.equal(instance, secondInstance);
			});
		});

		describe("SingletoneContainer.getInstance(key that doesn't exist in this container)", () => {
			it(`should return undefined`, () => {
				const noInstance = simpleContainer.getInstance("noKey");
				assert.equal(noInstance, undefined);
			});
		});
	});

	describe("SingletoneContainer.addInstance('stringKey', instance)", () => {
		const context = ContextContainerFactory.createContainer(DependencyTreeFixture.diConfig);
		context.init();
		const simpleContainer = new SingletoneContainer(context, []);

		it("should throw an error 'Invalid key type. Argument 'key' must be an instance of DIObjectKey class.'", () => {
			const funcThrowsError = () => simpleContainer.addInstance("stringKey", new DependencyTreeFixture.derivedClazz.type());
			assert.throws(funcThrowsError, Error, `Invalid key type. Argument 'key' must be an instance of DIObjectKey class.`);
		});

		it("should add an instance (error not thrown)", () => {
			const funcThrowsError = () =>
				simpleContainer.addInstance(DependencyTreeFixture.derivedNode.key, new DependencyTreeFixture.derivedClazz.type());
			assert.doesNotThrow(funcThrowsError, Error);
		});
	});

	describe("SingletoneContainer.getParent()", () => {
		it("should return context", () => {
			const context = DependencyTreeFixture.context;
			const singletoneContainer = new SingletoneContainer(context);
			assert.deepEqual(singletoneContainer.getParent(), context);
		});
	});
});
