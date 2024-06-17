async function get(depth = 2) {
	const ContextContainer = await import("../../src/containers/ContextContainer.js").then((module) => module.default);
	const { DemandedConfig, SingletoneConfig, SessionConfig } = await import("../../src/DIObjectConfig.js").then((module) => module);

	class A {
		constructor(b) {
			this.b = b;
		}
	}

	class BWithoutDeps {
		constructor() {}
	}

	class B {
		constructor(c) {
			this.c = c;
		}
	}

	class C {
		constructor(d) {
			this.d = d;
		}
	}

	class DWithoutDeps {
		constructor() {}
	}

	class D {
		constructor(e) {
			this.e = e;
		}
	}

	// eslint-disable-next-line no-unused-vars
	function e(h) {}

	class HWithoutDeps {
		constructor() {}
	}

	class H {
		constructor(t) {
			this.t = t;
		}
	}

	// eslint-disable-next-line no-unused-vars
	function t(g) {}

	function gWithoutDeps() {}

	// eslint-disable-next-line no-unused-vars
	function g(k) {}

	class K {
		// eslint-disable-next-line no-unused-vars
		constructor(l) {}
	}

	class L {
		constructor() {}
	}

	const DIConfig = [
		new DemandedConfig("a", A),
		depth > 2 ? new SingletoneConfig("b", B) : new SingletoneConfig("b", BWithoutDeps),
		new SessionConfig("c", C),
		depth > 4 ? new SingletoneConfig("d", D) : new SingletoneConfig("d", DWithoutDeps),
		new DemandedConfig("e", e),
		depth > 6 ? new SessionConfig("h", H) : new SessionConfig("h", HWithoutDeps),
		new DemandedConfig("t", t),
		depth > 8 ? new SingletoneConfig("g", g) : new SingletoneConfig("g", gWithoutDeps),
		new SingletoneConfig("k", K),
		new SingletoneConfig("l", L),
	];

	const appContext = new ContextContainer(DIConfig.slice(0, depth), "appContext" + depth);
	appContext.init();

	return {
		suiteName: "ContextContainer.get() with depth = " + depth,
		fn: () => {
			appContext.getInstance("a");
		},
	};
}

module.exports = get;
