import { assert } from "chai";
import ContextContainer from "../containers/ContextContainer.js"; // without this import mocha throws an error
import { SingletoneConfig } from "../DIObjectConfig.js";
import DependencyTree from "../containers/helpers/DependencyTree.js";
import AbstractContextContainerFixture from "./fixtures/AbstractContextContainerFixture.js";
import SessionContainer from "../containers/SessionContainer.js";
import SingletoneContainer from "../containers/SingletoneContainer.js";
import DemandedFactory from "../containers/DemandedFactory.js";
import SessionLifecycle from "../lifecycle/SessionLifecycle.js";
import DemandedLifecycle from "../lifecycle/DemandedLifecycle.js";
import SingletoneLifecycle from "../lifecycle/SingletoneLifecycle.js";

describe("ContextContainer", () => {
	describe("new ContextContainer()", () => {
		describe("create ContextContainer without arguments", () => {
			it(`should create an instance of ContextContainer with arguments default values`, () => {
				const createAbstractContext = (name = "") => new ContextContainer([], name);
				assert.doesNotThrow(createAbstractContext, Error);
				const context = createAbstractContext("uniqueContext");
				assert.equal(context.name, "uniqueContext");
				assert.deepEqual(context.config, []);
				assert.equal(context.getParent(), null);
				assert.deepEqual(context.classTreeList, []);
			});
		});

		describe("create ContextContainer with invalid config", () => {
			it(`should throw an error 'Invalid context config. Config must be an array of DIObjectConfig instances'`, () => {
				const createContext = () => new ContextContainer({ notDIObjectConfigArray: true });
				assert.throws(createContext, Error, "Invalid context config. Config must be an array of DIObjectConfig instances");
			});
		});

		describe("create ContextContainer with invalid parent", () => {
			it(`should throw an error
					'Invalid context parent.
					Parent must be an instance of AbstractContextContainer or it's derived class, null or undefined.'
				`, () => {
				const createContext = () =>
					new ContextContainer([], "uniqueContext1", {
						parent: {},
						name: "",
						config: [],
						classTreeList: [],
					});
				assert.throws(
					createContext,
					Error,
					"Invalid context parent. " +
						"Parent must be an instance of AbstractContextContainer or it's derived class, null or undefined.",
				);
			});
		});

		describe("create ContextContainer with invalid keyFactory", () => {
			it(`should throw an error
					'Invalid context keyFactory. KeyFactory must be an instance of DIObjectKeyFactory or it's derived class'
				`, () => {
				const createContext = () =>
					new ContextContainer([], "uniqueContext2", null, {
						createKey() {
							return `@name`;
						},
					});
				assert.throws(
					createContext,
					Error,
					"Invalid context keyFactory. KeyFactory must be an instance of DIObjectKeyFactory or it's derived class",
				);
			});
		});

		describe("create ContextContainer with valid arguments values", () => {
			it(`should create an instance of ContextContainer and set it's properties correctly`, () => {
				const baseContext = new ContextContainer([], "uniqueContext3");
				const createContext = (name = "") => new ContextContainer(AbstractContextContainerFixture.diConfig, name, baseContext);
				assert.doesNotThrow(createContext, Error);
				const context = createContext("correctName");
				assert.equal(context.getParent(), baseContext);
				assert.equal(context.name, "correctName");
				assert.deepEqual(context.config, AbstractContextContainerFixture.diConfig);
				assert.deepEqual(context.classTreeList, []);
				assert.deepEqual(context.scopes, new Map());
			});
		});
	});

	const commonContext = new ContextContainer(AbstractContextContainerFixture.diConfig, "abstractContext");
	commonContext.init();
	const commonExpectedList = [
		new DependencyTree(AbstractContextContainerFixture.derivedNode),
		new DependencyTree(AbstractContextContainerFixture.demandedBNode),
		new DependencyTree(AbstractContextContainerFixture.sessionBNode),
		new DependencyTree(AbstractContextContainerFixture.baseNode),
		new DependencyTree(AbstractContextContainerFixture.demandedANode),
		new DependencyTree(AbstractContextContainerFixture.sessionANode),
	];
	const commonInstances = [
		new AbstractContextContainerFixture.derivedNode.type(),
		new AbstractContextContainerFixture.demandedBNode.type(),
		new AbstractContextContainerFixture.sessionBNode.type(),
		new AbstractContextContainerFixture.baseNode.type(new AbstractContextContainerFixture.derivedNode.type()),
		new AbstractContextContainerFixture.demandedANode.type(new AbstractContextContainerFixture.demandedBNode.type()),
		new AbstractContextContainerFixture.sessionANode.type(new AbstractContextContainerFixture.sessionBNode.type()),
	];

	describe("ContextContainer.init()", () => {
		// test for old version of #validateDIConfig, now it's test in 23 line
		describe("ContextContainer.init() with absolutely valid config", () => {
			it("should set classTreeList correctly (list of DependencyTree instances)", () => {
				const expectedScopes = new Map();
				expectedScopes.set(
					3,
					new DemandedFactory(
						commonContext,
						commonExpectedList.filter((tree) => tree.baseNode.lifecycle.id === 3),
					),
				);
				expectedScopes.set(
					2,
					new SingletoneContainer(
						commonContext,
						commonExpectedList.filter((tree) => tree.baseNode.lifecycle.id === 2),
					),
				);
				expectedScopes.set(
					1,
					new SessionContainer(
						commonContext,
						commonExpectedList.filter((tree) => tree.baseNode.lifecycle.id === 1),
					),
				);
				commonExpectedList.forEach((tree, index) => {
					Object.keys(tree.baseNode).forEach((key) => {
						if (key === "lifecycle") {
							assert.deepEqual(commonContext.classTreeList[index].baseNode[key].id, tree.baseNode[key].id);
						} else if (key === "constructor") {
							assert.deepEqual(commonContext.classTreeList[index].baseNode[key].args, tree.baseNode[key].args);
						} else if (key === "deps") {
							assert.deepEqual(
								commonContext.classTreeList[index].baseNode[key].map((clsTree) => ({
									...clsTree,
									lifecycle: clsTree.lifecycle.id,
								})),
								tree.baseNode[key].map((clsTree) => ({
									...clsTree,
									lifecycle: clsTree.lifecycle.id,
								})),
							);
						} else {
							assert.deepEqual(commonContext.classTreeList[index].baseNode[key], tree.baseNode[key]);
						}
					});
				});
				assert.instanceOf(commonContext.scopes.get(1), SessionContainer);
				assert.instanceOf(commonContext.scopes.get(2), SingletoneContainer);
				assert.instanceOf(commonContext.scopes.get(3), DemandedFactory);
			});
		});

		describe("ContextContainer.init() with config that has a di object with type with invalid argument name", () => {
			it(
				"should throw an error " +
					"'Invalid argument name { ${argName} } in ${type}. There is no object with name { ${argName} } in DI Container.'",
				() => {
					class A {
						constructor(nonameB) {
							this.nonameB = nonameB;
						}
					}
					class B {
						constructor() {}
					}

					const diConfig = [new SingletoneConfig("nonameA", A), new SingletoneConfig("b", B)];
					const context = new ContextContainer(diConfig, "uniqueContext5");
					const init = () => context.init();
					assert.throws(
						init,
						Error,
						`Invalid argument name { nonameB } in nonameA. There is no object with name { nonameB } in DI Container.`,
					);
				},
			);
		});

		describe("ContextContainer.init() with config that has loop dependencies", () => {
			it("should throw an error " + "'${first} requires ${second}. And ${second} requires ${first}.'", () => {
				class A {
					constructor(b) {
						this.b = b;
					}
				}
				class B {
					constructor(a) {
						this.a = a;
					}
				}

				const diConfig = [new SingletoneConfig("a", A), new SingletoneConfig("b", B)];
				const context = new ContextContainer(diConfig, "uniqueContext6");
				const init = () => context.init();
				assert.throws(init, Error, `a requires b. And b requires a.`);
			});
		});
	});

	describe("ContextContainer._findClassTree()", () => {
		describe("ContextContainer._findClassTree(name) with included name", () => {
			it("should return classTree with correct name", () => {
				commonExpectedList.forEach((tree, index) => {
					Object.keys(tree.baseNode).forEach((key) => {
						if (key === "lifecycle") {
							assert.deepEqual(commonContext.classTreeList[index].baseNode[key].id, tree.baseNode[key].id);
						} else if (key === "constructor") {
							assert.deepEqual(commonContext.classTreeList[index].baseNode[key].args, tree.baseNode[key].args);
						} else if (key === "deps") {
							assert.deepEqual(
								commonContext._findClassTree(tree.baseNode.name).baseNode[key].map((clsTree) => ({
									...clsTree,
									lifecycle: clsTree.lifecycle.id,
								})),
								tree.baseNode[key].map((clsTree) => ({
									...clsTree,
									lifecycle: clsTree.lifecycle.id,
								})),
							);
						} else {
							assert.deepEqual(commonContext.classTreeList[index].baseNode[key], tree.baseNode[key]);
						}
					});
				});
			});
		});
	});

	describe("ContextContainer.hasDIObject()", () => {
		describe("ContextContainer.hasDIObject(name) with included name", () => {
			it("should return true", () => {
				commonExpectedList.forEach((tree) => {
					assert.equal(commonContext.hasDIObject(tree.baseNode.name), true);
				});
			});
		});

		describe("ContextContainer.hasDIObject(name) with not existed name", () => {
			it("should return false", () => {
				commonExpectedList.forEach((tree) => {
					assert.equal(commonContext.hasDIObject(tree.baseNode.name + "no"), false);
				});
			});
		});
	});

	describe("ContextContainer.hasInstance()", () => {
		describe("ContextContainer.hasInstance(name) before getting instance of di object with this name and lifecycle !== Session", () => {
			it("should return false", () => {
				commonExpectedList
					.filter((tree) => !(tree.baseNode.lifecycle instanceof SessionLifecycle))
					.forEach((tree) => {
						assert.equal(commonContext.hasInstance(tree.baseNode.name), false);
					});
			});
		});

		describe("ContextContainer.hasInstance(name) after getting instance of di object with this name", () => {
			it("should return true", () => {
				commonExpectedList
					.filter((tree) => !(tree.baseNode.lifecycle instanceof DemandedLifecycle))
					.forEach((tree) => {
						commonContext.getInstance(tree.baseNode.name);
						assert.equal(commonContext.hasInstance(tree.baseNode.name), true);
					});
			});
		});
	});

	describe("ContextContainer.getInstance()", () => {
		const filterSession = (tree) => tree instanceof SessionLifecycle;
		const filterSingletone = (tree) => tree instanceof SingletoneLifecycle;
		const filterDemanded = (tree) => tree instanceof DemandedLifecycle;

		describe("ContextContainer.getInstance(name) before context initialization", () => {
			it("should return undefined", () => {
				const context = new ContextContainer(AbstractContextContainerFixture.diConfig, "context for check getInstance before init");
				context.init();
				assert.equal(context.getInstance("a"), undefined);
			});
		});

		describe("ContextContainer.getInstance(name) with not existed name", () => {
			it("should return undefined", () => {
				const context = new ContextContainer(AbstractContextContainerFixture.diConfig, "context for getting undefined");
				context.init();
				assert.equal(context.getInstance("test undefined name"), undefined);
			});
		});

		describe("ContextContainer.getInstance(name) with name of Singletone", () => {
			it("should return an instance of singletone", () => {
				const context = new ContextContainer(AbstractContextContainerFixture.diConfig, "context for getting singletone");
				context.init();
				commonExpectedList.filter(filterSingletone).forEach((tree, index) => {
					assert.deepEqual(context.getInstance(tree.baseNode.name), commonInstances.filter(filterSingletone)[index]);
				});
			});
		});

		describe("second call ContextContainer.getInstance(name) with name of Singletone", () => {
			it("should return the same instance of singletone", () => {
				const context = new ContextContainer(AbstractContextContainerFixture.diConfig, "context for getting singletone two times");
				context.init();
				commonExpectedList.filter(filterSingletone).forEach((tree) => {
					const firstInstance = context.getInstance(tree.baseNode.name);
					assert.equal(context.getInstance(tree.baseNode.name), firstInstance);
				});
			});
		});

		describe("ContextContainer.getInstance(name) with name of Session", () => {
			it("should return an instance of session", () => {
				const context = new ContextContainer(AbstractContextContainerFixture.diConfig, "context for getting session");
				context.init();
				commonExpectedList.filter(filterSession).forEach((tree, index) => {
					assert.deepEqual(context.getInstance(tree.baseNode.name), commonInstances.filter(filterSession)[index]);
				});
			});
		});

		describe("second call ContextContainer.getInstance(name) with name of Session", () => {
			it("should return the same instance of session", () => {
				const context = new ContextContainer(AbstractContextContainerFixture.diConfig, "context for getting session two times");
				context.init();
				commonExpectedList.filter(filterSession).forEach((tree) => {
					const firstInstance = context.getInstance(tree.baseNode.name);
					assert.equal(context.getInstance(tree.baseNode.name), firstInstance);
				});
			});
		});

		describe("ContextContainer.getInstance(name) with name of Demanded", () => {
			it("should return an instance of demanded", () => {
				const context = new ContextContainer(AbstractContextContainerFixture.diConfig, "context for getting demanded");
				context.init();
				commonExpectedList.filter(filterDemanded).forEach((tree, index) => {
					assert.deepEqual(context.getInstance(tree.baseNode.name), commonInstances.filter(filterDemanded)[index]);
				});
			});
		});

		describe("second call ContextContainer.getInstance(name) with name of Demanded", () => {
			it("should return another instance of demanded", () => {
				const context = new ContextContainer(AbstractContextContainerFixture.diConfig, "context for getting demanded 2 times");
				context.init();
				commonExpectedList.filter(filterDemanded).forEach((tree) => {
					const firstInstance = context.getInstance(tree.baseNode.name);
					assert.notEqual(context.getInstance(tree.baseNode.name), firstInstance);
				});
			});
		});

		describe("ContextContainer.getInstance(name) with name of Demanded", () => {
			it("should return an instance of demanded", () => {
				const context = new ContextContainer(AbstractContextContainerFixture.diConfig, "base context");
				class ChildSingletone {
					constructor() {}
				}
				// eslint-disable-next-line no-unused-vars
				const childContext = new ContextContainer([new SingletoneConfig("child singletone", ChildSingletone)], "child context", context);
				context.init();
				assert.instanceOf(context.getInstance("child singletone"), ChildSingletone);
			});
		});
	});

	describe("ContextContainer.typeMatch()", () => {
		describe("ContextContainer.typeMatch(name, type) with not existed name", () => {
			it("should return false", () => {
				const funcThrowsError = () => commonContext.typeMatch("name", commonExpectedList[1].baseNode.type);
				assert.throws(funcThrowsError, Error, "There is no di object with this name.");
			});
		});

		describe("ContextContainer.typeMatch(name, type) with di object type !== type", () => {
			it("should return false", () => {
				assert.notEqual(commonContext.typeMatch(commonExpectedList[0].baseNode.name, commonExpectedList[1].baseNode.type));
			});
		});

		describe("ContextContainer.typeMatch(name, type) with di object type === type", () => {
			it("should return false", () => {
				assert.notEqual(commonContext.typeMatch(commonExpectedList[0].baseNode.name, commonExpectedList[0].baseNode.type));
			});
		});
	});

	describe("ContextContainer.getChildren()", () => {
		describe("call ContextContainer.getChildren() with no children", () => {
			it("should return empty Map", () => {
				assert.deepEqual(commonContext.getChildren(), new Map());
			});
		});

		describe("call ContextContainer.getChildren() with non empty children", () => {
			it("should return empty Map", () => {
				const context = new ContextContainer(AbstractContextContainerFixture.diConfig, "parent context");
				class ChildSingletone {
					constructor() {}
				}
				const childContext = new ContextContainer(
					[new SingletoneConfig("child singletone", ChildSingletone)],
					"parents child context",
					context,
				);
				assert.deepEqual(context.getChildren().get("parents child context"), childContext);
			});
		});
	});
});
