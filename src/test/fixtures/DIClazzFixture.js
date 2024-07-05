import ContextContainer from "../../containers/ContextContainer.js";
import ContextContainerFactory from "../../containers/ContextContainerFactory.js";
import DIObjectKeyFactory from "../../containers/helpers/DIObjectKeyFactory.js";
import SingletoneLifecycle from "../../lifecycle/SingletoneLifecycle.js";

const context = ContextContainerFactory.createContainer([], "context");
class A {
	constructor(b) {
		this.b = b;
	}
}
class B {
	constructor() {}
}

export default {
	key: new DIObjectKeyFactory().createKey(context, "a", new SingletoneLifecycle(), true),
	name: "a",
	type: A,
	isClass: true,
	lifecycle: new SingletoneLifecycle(),
	constructor: {
		startPosition: 10,
		args: ["b"],
	},
	key: new DIObjectKeyFactory().createKey(context, "b", new SingletoneLifecycle(), true),
	name: "b",
	type: B,
	isClass: true,
	lifecycle: new SingletoneLifecycle(),
	constructor: {
		startPosition: 10,
		args: [],
	},
};
