import DIClazz from "../../DIClazz.js";
import ContextContainer from "../../containers/ContextContainer.js"; // eslint-disable-line no-unused-vars
import DIObjectKeyFactory from "../../containers/helpers/DIObjectKeyFactory.js";
import SingletoneLifecycle from "../../lifecycle/SingletoneLifecycle.js";
import DependencyTreeNode from "../../containers/helpers/DependencyTreeNode.js";
import { DemandedConfig, SessionConfig, SingletoneConfig } from "../../DIObjectConfig.js";
import DemandedLifecycle from "../../lifecycle/DemandedLifecycle.js";
import SessionLifecycle from "../../lifecycle/SessionLifecycle.js";
import AbstractContextContainer from "../../containers/AbstractContextContainer.js";

class A {
	constructor(b) {
		this.b = b;
	}
}
class B {
	constructor() { }
}

class DemandedA {
	constructor(demandedB) {
		this.demandedB = demandedB;
	}
}
class DemandedB {
	constructor() { }
}

class SessionA {
	constructor(sessionB) {
		this.sessionB = sessionB;
	}
}
class SessionB {
	constructor() { }
}

const diConfig = [
	new SingletoneConfig("nonameA", A),
	new SingletoneConfig("b", B),
	new DemandedConfig("demandedA", DemandedA),
	new DemandedConfig("demandedB", DemandedB),
	new SessionConfig("sessionA", SessionA),
	new SessionConfig("sessionB", SessionB),
];
const context = new AbstractContextContainer(diConfig, "abstractContext");

const baseClazz = new DIClazz(
	new DIObjectKeyFactory().createKey(context, "nonameA", new SingletoneLifecycle(), true),
	"nonameA",
	A,
	true,
	new SingletoneLifecycle(),
	{
		startPosition: 11,
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
		startPosition: 11,
		args: [],
	},
);

const demandedAClazz = new DIClazz(
	new DIObjectKeyFactory().createKey(context, "demandedA", new DemandedLifecycle(), true),
	"demandedA",
	DemandedA,
	true,
	new DemandedLifecycle(),
	{
		startPosition: 19,
		args: ["demandedB"],
	},
);

const demandedBClazz = new DIClazz(
	new DIObjectKeyFactory().createKey(context, "demandedB", new DemandedLifecycle(), true),
	"demandedB",
	DemandedB,
	true,
	new DemandedLifecycle(),
	{
		startPosition: 19,
		args: [],
	},
);

const sessionAClazz = new DIClazz(
	new DIObjectKeyFactory().createKey(context, "sessionA", new SessionLifecycle(), true),
	"sessionA",
	SessionA,
	true,
	new SessionLifecycle(),
	{
		startPosition: 18,
		args: ["sessionB"],
	},
);

const sessionBClazz = new DIClazz(
	new DIObjectKeyFactory().createKey(context, "sessionB", new SessionLifecycle(), true),
	"sessionB",
	SessionB,
	true,
	new SessionLifecycle(),
	{
		startPosition: 18,
		args: [],
	},
);

const derivedNode = new DependencyTreeNode(derivedClazz, 0, []);
const demandedBNode = new DependencyTreeNode(demandedBClazz, 0, []);
const sessionBNode = new DependencyTreeNode(sessionBClazz, 0, []);

const baseNode = new DependencyTreeNode(baseClazz, 0, [new DependencyTreeNode(derivedClazz, 1, [])]);

const demandedANode = new DependencyTreeNode(demandedAClazz, 0, [new DependencyTreeNode(demandedBClazz, 1, [])]);

const sessionANode = new DependencyTreeNode(sessionAClazz, 0, [new DependencyTreeNode(sessionBClazz, 1, [])]);

export default {
	context,
	A,
	B,
	diConfig,
	baseNode,
	derivedNode,
	baseClazz,
	derivedClazz,
	demandedAClazz,
	demandedBClazz,
	demandedANode,
	demandedBNode,
	sessionAClazz,
	sessionBClazz,
	sessionANode,
	sessionBNode,
};
