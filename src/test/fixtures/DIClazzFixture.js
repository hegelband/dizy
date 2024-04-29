import ContextContainer from "../../containers/ContextContainer.js";
import DIObjectKeyFactory from "../../containers/helpers/DIObjectKeyFactory.js";
import SingletoneLifecycle from "../../lifecycle/SingletoneLifecycle.js";

const context = new ContextContainer([], 'context');
class A {
    constructor(b) { }
}
class B {
    constructor() { }
}

export default {
    key: (new DIObjectKeyFactory()).createKey(context, 'nonameA', new SingletoneLifecycle(), true),
    name: 'noname',
    type: A,
    isClass: true,
    lifecycle: new SingletoneLifecycle(),
    constructor: {
        startPosition: 10,
        args: ['b'],
    },
}
