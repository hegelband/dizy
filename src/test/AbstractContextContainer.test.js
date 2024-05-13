import { assert } from "chai";
// eslint-disable-next-line no-unused-vars
import ContextContainer from "../containers/ContextContainer.js"; // without this import mocha throws an error
import AbstractContextContainer from "../containers/AbstractContextContainer.js";
import { SingletoneConfig } from "../DIObjectConfig.js";
import DependencyTree from "../containers/helpers/DependencyTree.js";
import AbstractContextContainerFixture from "./fixtures/AbstractContextContainerFixture.js";

describe("AbstractContextContainer", () => {
	describe("new AbstractContextContainer()", () => {
		describe("create AbstractContextContainer without arguments", () => {
			it(`should create an instance of AbstractContextContainer with arguments default values`, () => {
				const createAbstractContext = () => new AbstractContextContainer([], "abstractContext");
				assert.doesNotThrow(createAbstractContext, Error);
				const context = createAbstractContext();
				assert.equal(context.name, "abstractContext");
				assert.deepEqual(context.config, []);
				assert.equal(context.getParent(), null);
				assert.deepEqual(context.classTreeList, []);
			});
		});

		describe("create AbstractContextContainer with invalid config", () => {
			it(`should throw an error 'Invalid context config. Config must be an array of DIObjectConfig instances'`, () => {
				const createAbstractContext = () => new AbstractContextContainer({ notDIObjectConfigArray: true });
				assert.throws(createAbstractContext, Error, "Invalid context config. Config must be an array of DIObjectConfig instances");
			});
		});

		describe("create AbstractContextContainer with invalid parent", () => {
			it(`should throw an error
				'Invalid context parent. Parent must be an instance of AbstractContextContainer or it's derived class, null or undefined.'
				`, () => {
				const createAbstractContext = () =>
					new AbstractContextContainer([], "abstractContext", {
						parent: {},
						name: "",
						config: [],
						classTreeList: [],
					});
				assert.throws(
					createAbstractContext,
					Error,
					"Invalid context parent. " +
						"Parent must be an instance of AbstractContextContainer or it's derived class, null or undefined.",
				);
			});
		});

		describe("create AbstractContextContainer with invalid keyFactory", () => {
			it(`should throw an error
				'Invalid context keyFactory. KeyFactory must be an instance of DIObjectKeyFactory or it's derived class'
				`, () => {
				const createAbstractContext = () =>
					new AbstractContextContainer([], "abstractContext", null, {
						createKey() {
							return `@name`;
						},
					});
				assert.throws(
					createAbstractContext,
					Error,
					"Invalid context keyFactory. KeyFactory must be an instance of DIObjectKeyFactory or it's derived class",
				);
			});
		});

		describe("create AbstractContextContainer with valid arguments values", () => {
			it(`should create an instance of AbstractContextContainer and set it's properties correctly`, () => {
				const baseContext = new AbstractContextContainer([], "context");
				let context;
				const createAbstractContext = () => {
					context = new AbstractContextContainer(AbstractContextContainerFixture.diConfig, "correctName", baseContext);
				};
				assert.doesNotThrow(createAbstractContext, Error);
				assert.equal(context.getParent(), baseContext);
				assert.equal(context.name, "correctName");
				assert.deepEqual(context.config, AbstractContextContainerFixture.diConfig);
				assert.deepEqual(context.classTreeList, []);
				assert.deepEqual(context.scopes, new Map());
			});
		});
	});

	describe("AbstractContextContainer.init()", () => {
		// test for old version of #validateDIConfig, now it's test in 23 line
		describe("AbstractContextContainer.init() with absolutely valid config", () => {
			it("should set classTreeList correctly (list of DependencyTree instances)", () => {
				const context = new AbstractContextContainer(AbstractContextContainerFixture.diConfig, "abstractContext");
				context.init();
				const expected = [
					new DependencyTree(AbstractContextContainerFixture.derivedNode),
					new DependencyTree(AbstractContextContainerFixture.demandedBNode),
					new DependencyTree(AbstractContextContainerFixture.sessionBNode),
					new DependencyTree(AbstractContextContainerFixture.baseNode),
					new DependencyTree(AbstractContextContainerFixture.demandedANode),
					new DependencyTree(AbstractContextContainerFixture.sessionANode),
				];
				expected.forEach((tree, index) => {
					Object.keys(tree.baseNode).forEach((key) => {
						if (key === "lifecycle") {
							assert.deepEqual(context.classTreeList[index].baseNode[key].id, tree.baseNode[key].id);
						} else if (key === "constructor") {
							assert.deepEqual(context.classTreeList[index].baseNode[key].args, tree.baseNode[key].args);
						} else if (key === "deps") {
							assert.deepEqual(
								context.classTreeList[index].baseNode[key].map((clsTree) => ({
									...clsTree,
									lifecycle: clsTree.lifecycle.id,
								})),
								tree.baseNode[key].map((clsTree) => ({
									...clsTree,
									lifecycle: clsTree.lifecycle.id,
								})),
							);
						} else {
							assert.deepEqual(context.classTreeList[index].baseNode[key], tree.baseNode[key]);
						}
					});
				});
			});
		});

		describe("AbstractContextContainer.init() with config that has a di object with type with invalid argument name", () => {
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
					const context = new AbstractContextContainer(diConfig, "abstractContext");
					const init = () => context.init();
					assert.throws(
						init,
						Error,
						`Invalid argument name { nonameB } in nonameA. There is no object with name { nonameB } in DI Container.`,
					);
				},
			);
		});

		describe("AbstractContextContainer.init() with config that has loop dependencies", () => {
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
				const context = new AbstractContextContainer(diConfig, "abstractContext");
				const init = () => context.init();
				assert.throws(init, Error, `a requires b. And b requires a.`);
			});
		});
	});

	describe("AbstractContextContainer._findClassTree()", () => {
		// test for old version of #validateDIConfig, now it's test in 23 line
		describe("AbstractContextContainer._findClassTree(name) with included name", () => {
			it("should return classTree with correct name", () => {
				const context = new AbstractContextContainer(AbstractContextContainerFixture.diConfig, "abstractContext");
				context.init();
				const expectedList = [
					new DependencyTree(AbstractContextContainerFixture.derivedNode),
					new DependencyTree(AbstractContextContainerFixture.demandedBNode),
					new DependencyTree(AbstractContextContainerFixture.sessionBNode),
					new DependencyTree(AbstractContextContainerFixture.baseNode),
					new DependencyTree(AbstractContextContainerFixture.demandedANode),
					new DependencyTree(AbstractContextContainerFixture.sessionANode),
				];
				expectedList.forEach((tree, index) => {
					Object.keys(tree.baseNode).forEach((key) => {
						if (key === "lifecycle") {
							assert.deepEqual(context.classTreeList[index].baseNode[key].id, tree.baseNode[key].id);
						} else if (key === "constructor") {
							assert.deepEqual(context.classTreeList[index].baseNode[key].args, tree.baseNode[key].args);
						} else if (key === "deps") {
							assert.deepEqual(
								context._findClassTree(tree.baseNode.name).baseNode[key].map((clsTree) => ({
									...clsTree,
									lifecycle: clsTree.lifecycle.id,
								})),
								tree.baseNode[key].map((clsTree) => ({
									...clsTree,
									lifecycle: clsTree.lifecycle.id,
								})),
							);
						} else {
							assert.deepEqual(context.classTreeList[index].baseNode[key], tree.baseNode[key]);
						}
					});
				});
			});
		});
	});
});
