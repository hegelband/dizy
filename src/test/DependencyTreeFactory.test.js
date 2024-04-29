import { assert } from 'chai';
import DependencyTreeFactory from "../containers/helpers/DependencyTreeFactory.js";
import DependencyTreeFixture from './fixtures/DependencyTreeFixture.js';
import DependencyTree from '../containers/helpers/DependencyTree.js';

describe('DependencyTreeFactory', function () {

    describe('DependencyTreeFactory.createDependencyTree()', function () {
        it('createDependencyTree() without arguments will throw an error', function () {
            const funcThrowsError = () => DependencyTreeFactory.createDependencyTree();
            assert.throws(
                funcThrowsError,
                Error,
                "Argument 'baseClazz' is invalid. 'baseClazz' must be an instance of DIClazz"
            );
        });

        it('createDependencyTree() with empty allClasses[]', function () {
            const funcThrowsError = () => DependencyTreeFactory.createDependencyTree(DependencyTreeFixture.baseClazz, []);
            assert.throws(
                funcThrowsError,
                Error,
                "Argument 'allClasses' is invalid. 'allClasses' must be a not empty array of DIClazz instances"
            );
        });

        it("createDependencyTree() with allClasses, that's not an array", function () {
            const funcThrowsError = () => DependencyTreeFactory.createDependencyTree(DependencyTreeFixture.baseClazz, {});
            assert.throws(
                funcThrowsError,
                Error,
                "Argument 'allClasses' is invalid. 'allClasses' must be a not empty array of DIClazz instances"
            );
        });

        it("createDependencyTree() with allClasses, that's an array of not DIClazz instances", function () {
            const funcThrowsError = () => DependencyTreeFactory.createDependencyTree(DependencyTreeFixture.baseClazz, [{ test: 1 }, { test: 2 }]);
            assert.throws(
                funcThrowsError,
                Error,
                "Argument 'allClasses' is invalid. 'allClasses' must be a not empty array of DIClazz instances"
            );
        });

        it("createDependencyTree() with valid arguments", function () {
            assert.deepEqual(
                DependencyTreeFactory.createDependencyTree(
                    DependencyTreeFixture.baseClazz,
                    [
                        DependencyTreeFixture.baseClazz,
                        DependencyTreeFixture.derivedClazz,
                    ]
                ),
                new DependencyTree(DependencyTreeFixture.baseNode),
            );
        });
    });
});
