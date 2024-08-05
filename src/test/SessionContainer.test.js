import { assert } from "chai";
import DependencyTreeFixture from "./fixtures/DependencyTreeFixture.js";
import DependencyTree from "../containers/helpers/DependencyTree.js";
import DependencyTreeNode from "../containers/helpers/DependencyTreeNode.js";
import SessionContainer from "../containers/SessionContainer.js";
// import ContextContainer from "../containers/ContextContainer.js";
import ContextContainerFactory from "../containers/ContextContainerFactory.js";
import LifecycleEnum from "../constants/LifecycleEnum.js";

describe("SessionContainer", () => {
	describe("new SessionContainer()", () => {
		it(
			"should throw an error " +
				"'Invalid simple container parent. " +
				"Parent must be an instance of AbstractContextContainer or it's derived class, null or undefined.'",
			() => {
				const funcThrowsError = () => new SessionContainer();
				assert.throws(
					funcThrowsError,
					Error,
					"Invalid simple container parent. " +
						"Parent must be an instance of AbstractContextContainer or it's derived class, null or undefined.",
				);
			},
		);
	});

	describe("new SessionContainer(context)", () => {
		it("should not throw an error; classTreeList defined with default value = []", () => {
			const funcThrowsError = () => new SessionContainer(DependencyTreeFixture.context);
			assert.doesNotThrow(
				funcThrowsError,
				Error,
				"DIContainer constructor's argument 'classTreeList' is invalid. " +
					"Argument 'classTreeList' must be an array of DependencyTree instances",
			);
			assert.deepEqual(funcThrowsError().classTreeList, []);
		});
	});

	describe("new SessionContainer(context, [new DependencyTree(baseNode)])", () => {
		it("should set classTreeList correctly", () => {
			const funcThrowsError = () =>
				new SessionContainer(DependencyTreeFixture.context, [new DependencyTree(DependencyTreeFixture.sessionANode)]);
			assert.doesNotThrow(
				funcThrowsError,
				Error,
				"DIContainer constructor's argument 'classTreeList' is invalid. " +
					"Argument 'classTreeList' must be an array of DependencyTree instances",
			);
		});
	});

	describe("new SessionContainer(context, [{ test: 1 }, { test: 2 }])", () => {
		it(
			"should throw an error " +
				"'DIContainer constructor's argument 'classTreeList' is invalid. " +
				"Argument 'classTreeList' must be an array of DependencyTree instances'",
			() => {
				const funcThrowsError = () => new SessionContainer(DependencyTreeFixture.context, [{ test: 1 }, { test: 2 }]);
				assert.throws(
					funcThrowsError,
					Error,
					"DIContainer constructor's argument 'classTreeList' is invalid. " +
						"Argument 'classTreeList' must be an array of DependencyTree instances",
				);
			},
		);
	});

	describe("SessionContainer.getInstance(key of di object from this container) before SessionContainer initialized", () => {
		it("should return undefined", () => {
			const clazzTrees = [
				new DependencyTree(DependencyTreeFixture.sessionANode),
				new DependencyTree(new DependencyTreeNode(DependencyTreeFixture.sessionBClazz, 0, [])),
			];
			const context = ContextContainerFactory.createContainer(DependencyTreeFixture.diConfig);
			context.init();
			const sessionScope = new SessionContainer(context, clazzTrees);
			const instance = sessionScope.getInstance(DependencyTreeFixture.sessionANode.key);
			assert.equal(instance, undefined);
		});
	});

	describe("SessionContainer.getInstance() after SessionContainer.init()", () => {
		const clazzTrees = [
			new DependencyTree(DependencyTreeFixture.sessionANode),
			new DependencyTree(new DependencyTreeNode(DependencyTreeFixture.sessionBClazz, 0, [])),
		];
		const context = ContextContainerFactory.createContainer(DependencyTreeFixture.diConfig);
		context.init();
		const sessionScope = new SessionContainer(context, clazzTrees);
		sessionScope.init();
		const instance = sessionScope.getInstance(DependencyTreeFixture.sessionANode.key);

		describe("SessionContainer.getInstance(key of di object from this container)", () => {
			it(`should return an instance of class A`, () => {
				assert.deepEqual(instance, new DependencyTreeFixture.sessionAClazz.type(new DependencyTreeFixture.sessionBClazz.type()));
			});
		});

		describe("call SessionContainer.getInstance(key of di object from this container) two times", () => {
			it(`should return the same instance for each call`, () => {
				const secondInstance = sessionScope.getInstance(DependencyTreeFixture.sessionANode.key);
				assert.equal(instance, secondInstance);
			});
		});

		describe("SessionContainer.getInstance(key that doesn't exist in this container)", () => {
			it(`should return undefined`, () => {
				const noInstance = sessionScope.getInstance("noKey");
				assert.equal(noInstance, undefined);
			});
		});
	});

	describe("SessionContainer.addInstance('stringKey', instance)", () => {
		const context = DependencyTreeFixture.context;
		context.init();
		const sessionScope = new SessionContainer(
			context,
			context.classTreeList.filter((clsTree) => clsTree.baseNode.lifecycle.id === LifecycleEnum.Session),
		);

		it("should throw an error 'Invalid key type. Argument 'key' must be an instance of DIObjectKey class.'", () => {
			const funcThrowsError = () => sessionScope.addInstance("stringKey", new DependencyTreeFixture.sessionBClazz.type());
			assert.throws(funcThrowsError, Error, `Invalid key type. Argument 'key' must be an instance of DIObjectKey class.`);
		});

		it("should add an instance (error not thrown)", () => {
			const funcThrowsError = () =>
				sessionScope.addInstance(DependencyTreeFixture.sessionBNode.key, new DependencyTreeFixture.sessionBClazz.type());
			assert.doesNotThrow(funcThrowsError, Error);
		});
	});

	describe("SessionContainer.getParent()", () => {
		it("should return context", () => {
			const context = DependencyTreeFixture.context;
			const sessionScope = new SessionContainer(context);
			assert.deepEqual(sessionScope.getParent(), context);
		});
	});
});
