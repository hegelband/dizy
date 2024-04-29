import DIClazz from "../../DIClazz.js";
import ContextContainer from "../../containers/ContextContainer.js";
import DIObjectKeyFactory from "../../containers/helpers/DIObjectKeyFactory.js";
import SingletoneLifecycle from "../../lifecycle/SingletoneLifecycle.js";
import DependencyTreeNode from "../../containers/helpers/DependencyTreeNode.js";

const context = new ContextContainer([], 'context');
class A {
    constructor(b) { }
}
class B {
    constructor() { }
}

const baseClazz = new DIClazz(
    (new DIObjectKeyFactory()).createKey(context, 'nonameA', new SingletoneLifecycle(), true),
    'noname',
    A,
    true,
    new SingletoneLifecycle(),
    {
        startPosition: 10,
        args: ['b'],
    },
);

const derivedClazz = new DIClazz(
    (new DIObjectKeyFactory()).createKey(context, 'b', new SingletoneLifecycle(), true),
    'b',
    B,
    true,
    new SingletoneLifecycle(),
    {
        startPosition: 10,
        args: [],
    },
);

const derivedNode = new DependencyTreeNode(derivedClazz, 1, []);

const baseNode = new DependencyTreeNode(
    baseClazz,
    0,
    [
        derivedNode,
    ]
);

export default {
    context,
    A,
    B,
    baseNode,
    baseClazz,
    derivedClazz,
}