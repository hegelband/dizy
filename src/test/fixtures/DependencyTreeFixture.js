import DIClazz from "../../DIClazz.js";
import ContextContainer from "../../containers/ContextContainer.js";
import DIObjectKeyFactory from "../../containers/helpers/DIObjectKeyFactory.js";
import SingletoneLifecycle from "../../lifecycle/SingletoneLifecycle.js";
import DependencyTreeNode from "../../containers/helpers/DependencyTreeNode.js";
import { DemandedConfig, SessionConfig, SingletoneConfig } from "../../DIObjectConfig.js";
import DemandedLifecycle from "../../lifecycle/DemandedLifecycle.js";
import SessionLifecycle from "../../lifecycle/SessionLifecycle.js";
import ContextContainerFactory from "../../containers/ContextContainerFactory.js";

class A {
	constructor(b) {
		this.b = b;
	}
}
class B {
	constructor() {}
}

class DemA {
	constructor(demB) {
		this.demB = demB;
	}
}
class DemB {
	constructor() {}
}

class SessionA {
	constructor(sessionB) {
		this.sessionB = sessionB;
	}
}
class SessionB {
	constructor() {}
}

const diConfig = [
	new SingletoneConfig("noname", A),
	new SingletoneConfig("b", B),
	new DemandedConfig("demA", DemA),
	new DemandedConfig("demB", DemB),
	new SessionConfig("sessionA", SessionA),
	new SessionConfig("sessionB", SessionB),
];
const context = ContextContainerFactory.createContainer(diConfig);

const baseClazz = new DIClazz(
	new DIObjectKeyFactory().createKey(context, "nonameA", new SingletoneLifecycle(), true),
	"noname",
	A,
	true,
	new SingletoneLifecycle(),
	{
		args: ["b"],
	},
);

const derivedClazz = new DIClazz(
	new DIObjectKeyFactory().createKey(context, "b", new SingletoneLifecycle(), true),
	"b",
	B,
	true,
	new SingletoneLifecycle(),
	{
		args: [],
	},
);

const demAClazz = new DIClazz(
	new DIObjectKeyFactory().createKey(context, "demA", new DemandedLifecycle(), true),
	"demA",
	DemA,
	true,
	new DemandedLifecycle(),
	{
		args: ["demB"],
	},
);

const demBClazz = new DIClazz(
	new DIObjectKeyFactory().createKey(context, "demB", new DemandedLifecycle(), true),
	"demB",
	DemB,
	true,
	new DemandedLifecycle(),
	{
		args: [],
	},
);

const sessionAClazz = new DIClazz(
	new DIObjectKeyFactory().createKey(context, "demA", new SessionLifecycle(), true),
	"sessionA",
	SessionA,
	true,
	new SessionLifecycle(),
	{
		args: ["sessionB"],
	},
);

const sessionBClazz = new DIClazz(
	new DIObjectKeyFactory().createKey(context, "demB", new SessionLifecycle(), true),
	"sessionB",
	SessionB,
	true,
	new SessionLifecycle(),
	{
		args: [],
	},
);

const derivedNode = new DependencyTreeNode(derivedClazz, 1, []);
const demBNode = new DependencyTreeNode(demBClazz, 1, []);
const sessionBNode = new DependencyTreeNode(sessionBClazz, 1, []);

const baseNode = new DependencyTreeNode(baseClazz, 0, [derivedNode]);

const demANode = new DependencyTreeNode(demAClazz, 0, [demBNode]);

const sessionANode = new DependencyTreeNode(sessionAClazz, 0, [sessionBNode]);

export default {
	context,
	A,
	B,
	diConfig,
	baseNode,
	derivedNode,
	baseClazz,
	derivedClazz,
	demAClazz,
	demBClazz,
	demANode,
	demBNode,
	sessionAClazz,
	sessionBClazz,
	sessionANode,
	sessionBNode,
};
