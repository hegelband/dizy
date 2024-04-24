import DependencyTreeNode from "../utils/DependencyTreeNode.js";
import { assert } from 'chai';
import InstanceHelper from "../containers/helpers/InstanceHelper.js";
import DIObjectKeyFactory from "../containers/helpers/DIObjectKeyFactory.js";
import SingletoneLifecycle from "../lifecycle/SingletoneLifecycle.js";

let keyFactory;
describe('InstanceHelper', function () {
    before(function () {
        keyFactory = new DIObjectKeyFactory();
    });
    describe('InstanceHelper.create()', function () {
        it('create instance of class C - InstanceHelper.create(clazzTreeNode, [A, B])', function () {
            class C {
                constructor(A, B) {
                    this.a = A;
                    this.b = B;
                }
            }
            const classTreeNode = new DependencyTreeNode({
                key: keyFactory.createKey(null, 'testClass', new SingletoneLifecycle(), true),
                name: 'testClass',
                type: C,
                isClass: true,
                lifecycle: new SingletoneLifecycle(),
                constructor: { startPosition: 30, args: ['A', 'B'] },
                deps: [],
                height: 0,
            });
            assert.instanceOf(InstanceHelper.createInstance(classTreeNode, [{ width: 10 }, { height: 10 }]), classTreeNode.type);
        });

        it('create instance of function K - InstanceHelper.create(clazzTreeNode, [T, D])', function () {
            function K(T, D) { return T.width; }
            const funcTreeNode = new DependencyTreeNode({
                key: keyFactory.createKey(null, 'testFunc', new SingletoneLifecycle(), true),
                name: 'testFunc',
                type: K,
                isClass: false,
                lifecycle: new SingletoneLifecycle(),
                constructor: { startPosition: 30, args: ['T', 'D'] },
                deps: [],
                height: 0,
            });
            const funcWrapper = InstanceHelper.createInstance(funcTreeNode, [{ width: 10 }, { height: 10 }]);
            assert.equal(funcWrapper.func, K);
        });
    });
});
