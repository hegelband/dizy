import DependencyTreeNode from "../containers/helpers/DependencyTreeNode.js";
import { assert } from 'chai';
import InstanceHelper from "../containers/helpers/InstanceHelper.js";
import DIObjectKeyFactory from "../containers/helpers/DIObjectKeyFactory.js";
import SingletoneLifecycle from "../lifecycle/SingletoneLifecycle.js";
import ContextContainer from "../containers/ContextContainer.js";
import DIClazz from "../DIClazz.js";

describe('InstanceHelper', function () {
    const keyFactory = new DIObjectKeyFactory();
    const context = new ContextContainer([], 'context');

    describe('InstanceHelper.create()', function () {
        it('create instance of class C - InstanceHelper.create(clazzTreeNode, [A, B])', function () {
            class C {
                constructor(A, B) {
                    this.a = A;
                    this.b = B;
                }
            }
            const baseClazz = new DIClazz(
                keyFactory.createKey(context, 'testClass', new SingletoneLifecycle(), true),
                'testClass',
                C,
                true,
                new SingletoneLifecycle(),
                { startPosition: 30, args: ['A', 'B'] },
            );
            const classTreeNode = new DependencyTreeNode(baseClazz, 0, []);
            assert.instanceOf(InstanceHelper.createInstance(classTreeNode, [{ width: 10 }, { height: 10 }]), classTreeNode.type);
        });

        it('create instance of function K - InstanceHelper.create(clazzTreeNode, [T, D])', function () {
            function K(T, D) { return T.width; }
            const baseClazz = new DIClazz(
                keyFactory.createKey(context, 'testFunc', new SingletoneLifecycle(), true),
                'testFunc',
                K,
                false,
                new SingletoneLifecycle(),
                { startPosition: 30, args: ['T', 'D'] },
            );
            const funcTreeNode = new DependencyTreeNode(baseClazz, 0, []);
            const funcWrapper = InstanceHelper.createInstance(funcTreeNode, [{ width: 10 }, { height: 10 }]);
            assert.equal(funcWrapper.func, K);
        });
    });
});
