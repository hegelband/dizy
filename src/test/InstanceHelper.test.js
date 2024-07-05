import DependencyTreeNode from "../containers/helpers/DependencyTreeNode.js";
import { assert } from "chai";
import InstanceHelper from "../containers/helpers/InstanceHelper.js";
import DIObjectKeyFactory from "../containers/helpers/DIObjectKeyFactory.js";
import SingletoneLifecycle from "../lifecycle/SingletoneLifecycle.js";
import ContextContainer from "../containers/ContextContainer.js";
import DIClazz from "../DIClazz.js";
import ContextContainerFactory from "../containers/ContextContainerFactory.js";

describe("InstanceHelper", () => {
	const keyFactory = new DIObjectKeyFactory();
	const context = ContextContainerFactory.createContainer([]);

	describe("InstanceHelper.create()", () => {
		it("create instance of class C - InstanceHelper.create(clazzTreeNode, [A, B])", () => {
			class C {
				constructor(A, B) {
					this.a = A;
					this.b = B;
				}
			}
			const baseClazz = new DIClazz(
				keyFactory.createKey(context, "testClass", new SingletoneLifecycle(), true),
				"testClass",
				C,
				true,
				new SingletoneLifecycle(),
				{ startPosition: 30, args: ["A", "B"] },
			);
			const classTreeNode = new DependencyTreeNode(baseClazz, 0, []);
			assert.instanceOf(InstanceHelper.createInstance(classTreeNode, [{ width: 10 }, { height: 10 }]), classTreeNode.type);
		});

		it("create instance of function K - InstanceHelper.create(clazzTreeNode, [T, D])", () => {
			function K(T) {
				return T.width;
			}
			const baseClazz = new DIClazz(
				keyFactory.createKey(context, "testFunc", new SingletoneLifecycle(), true),
				"testFunc",
				K,
				false,
				new SingletoneLifecycle(),
				{ startPosition: 30, args: ["T"] },
			);
			const funcTreeNode = new DependencyTreeNode(baseClazz, 0, []);
			const funcWrapper = InstanceHelper.createInstance(funcTreeNode, [{ width: 10 }, { height: 10 }]);
			assert.equal(funcWrapper.func, K);
		});
	});
});
