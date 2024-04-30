import { assert } from 'chai';
import DependencyTreeFixture from './fixtures/DependencyTreeFixture.js';
import DependencyTree from '../containers/helpers/DependencyTree.js';
import DependencyTreeNode from '../containers/helpers/DependencyTreeNode.js';
import SingletoneContainer from '../containers/SingletoneContainer.js';
import ContextContainer from '../containers/ContextContainer.js';

describe('SingletoneContainer', function () {

    describe('new SingletoneContainer()', function () {
        it(
            "should throw an error 'Invalid simple container parent. Parent must be an instance of AbstractContextContainer or it's derived class, null or undefined.'",
            function () {
                const funcThrowsError = () => new SingletoneContainer();
                assert.throws(
                    funcThrowsError,
                    Error,
                    "Invalid simple container parent. Parent must be an instance of AbstractContextContainer or it's derived class, null or undefined."
                );
            }
        );
    });

    describe('new SingletoneContainer(context)', function () {
        it(
            "should not throw an error; classTreeList defined with default value = []",
            function () {
                const funcThrowsError = () => new SingletoneContainer(DependencyTreeFixture.context);
                assert.doesNotThrow(
                    funcThrowsError,
                    Error,
                    "DIContainer constructor's argument 'classTreeList' is invalid. Argument 'classTreeList' must be an array of DependencyTree instances"
                );
                assert.deepEqual(funcThrowsError().classTreeList, []);
            }
        );
    });

    describe('new SingletoneContainer(context, [new DependencyTree(baseNode)])', function () {
        it("should set classTreeList correctly", function () {
            const funcThrowsError = () => new SingletoneContainer(DependencyTreeFixture.context, [new DependencyTree(DependencyTreeFixture.baseNode)]);
            assert.doesNotThrow(
                funcThrowsError,
                Error,
                "DIContainer constructor's argument 'classTreeList' is invalid. Argument 'classTreeList' must be an array of DependencyTree instances"
            );
        });
    });

    describe('new SingletoneContainer(context, [{ test: 1 }, { test: 2 }])', function () {
        it(
            "should throw an error " +
            "'DIContainer constructor's argument 'classTreeList' is invalid. Argument 'classTreeList' must be an array of DependencyTree instances'",
            function () {
                const funcThrowsError = () => new SingletoneContainer(DependencyTreeFixture.context, [{ test: 1 }, { test: 2 }]);
                assert.throws(
                    funcThrowsError,
                    Error,
                    "DIContainer constructor's argument 'classTreeList' is invalid. Argument 'classTreeList' must be an array of DependencyTree instances"
                );
            }
        );
    });

    describe('SingletoneContainer.getInstance()', function () {
        const clazzTrees = [
            new DependencyTree(DependencyTreeFixture.baseNode),
            new DependencyTree(new DependencyTreeNode(DependencyTreeFixture.derivedClazz, 0, []))
        ];
        const context = new ContextContainer(DependencyTreeFixture.diConfig, 'context');
        context.init();
        const simpleContainer = new SingletoneContainer(context, clazzTrees);
        const instance = simpleContainer.getInstance(DependencyTreeFixture.baseNode.key);

        describe('SingletoneContainer.getInstance(key of di object from this container)', function () {
            it(`should return an instance of class A`, function () {
                assert.deepEqual(instance, new DependencyTreeFixture.baseClazz.type(new DependencyTreeFixture.derivedClazz.type()));
            });
        });

        describe('call SingletoneContainer.getInstance(key of di object from this container) two times', function () {
            it(`should return the same instance for each call`, function () {
                const secondInstance = simpleContainer.getInstance(DependencyTreeFixture.baseNode.key);
                assert.equal(instance, secondInstance);
            });
        });

        describe("SingletoneContainer.getInstance(key that doesn't exist in this container)", function () {
            it(`should return undefined`, function () {
                const noInstance = simpleContainer.getInstance('noKey');
                assert.equal(noInstance, undefined);
            });
        });
    });

    describe('SingletoneContainer.getParent()', function () {
        it('should return context', function () {
            const context = DependencyTreeFixture.context;
            const singletoneContainer = new SingletoneContainer(context);
            assert.deepEqual(singletoneContainer.getParent(), context);
        });
    });
});
