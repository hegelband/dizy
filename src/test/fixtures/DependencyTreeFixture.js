import ContextContainer from "../../containers/ContextContainer.js";
import DIObjectKeyFactory from "../../containers/helpers/DIObjectKeyFactory.js";
import SingletoneLifecycle from "../../lifecycle/SingletoneLifecycle.js";
import DependencyTreeNode from "../../utils/DependencyTreeNode.js";

const context = new ContextContainer([], 'context');
class A {
    constructor(b) { }
}
class B {
    constructor() { }
}
const baseNode = new DependencyTreeNode({
    key: (new DIObjectKeyFactory()).createKey(context, 'nonameA', new SingletoneLifecycle(), true),
    name: 'noname',
    type: A,
    constructor: {
        startPosition: 10,
        args: ['b'],
    },
    deps: [
        {
            key: (new DIObjectKeyFactory()).createKey(context, 'b', new SingletoneLifecycle(), true),
            name: 'b',
            type: B,
            constructor: {
                startPosition: 10,
                args: [],
            },
            deps: [],
            height: 1,
            isClass: true,
            lifecycle: new SingletoneLifecycle(),
        }
    ],
    height: 0,
    isClass: true,
    lifecycle: new SingletoneLifecycle(),
});

export default {
    context,
    A,
    B,
    baseNode,
}