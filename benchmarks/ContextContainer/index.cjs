const Benchmark = require("benchmark");
const Suite = Benchmark.Suite;

const contextContainerSuite = new Suite("ContextContainer");

async function run() {
	const initWithDepthTwo = await import("./init.cjs").then((module) => module.default(2));
	const initWithDepthFour = await import("./init.cjs").then((module) => module.default(4));
	const initWithDepthSix = await import("./init.cjs").then((module) => module.default(6));
	const initWithDepthEight = await import("./init.cjs").then((module) => module.default(8));
	const initWithDepthTen = await import("./init.cjs").then((module) => module.default(10));
	const getWithDepthTwo = await import("./get.cjs").then((module) => module.default(2));
	const getWithDepthFour = await import("./get.cjs").then((module) => module.default(4));
	const getWithDepthSix = await import("./get.cjs").then((module) => module.default(6));
	const getWithDepthEight = await import("./get.cjs").then((module) => module.default(8));
	const getWithDepthTen = await import("./get.cjs").then((module) => module.default(10));
	contextContainerSuite
		.add(initWithDepthTwo.suiteName, initWithDepthTwo.fn)
		.add(initWithDepthFour.suiteName, initWithDepthFour.fn)
		.add(initWithDepthSix.suiteName, initWithDepthSix.fn)
		.add(initWithDepthEight.suiteName, initWithDepthEight.fn)
		.add(initWithDepthTen.suiteName, initWithDepthTen.fn)
		.add(getWithDepthTwo.suiteName, getWithDepthTwo.fn)
		.add(getWithDepthFour.suiteName, getWithDepthFour.fn)
		.add(getWithDepthSix.suiteName, getWithDepthSix.fn)
		.add(getWithDepthEight.suiteName, getWithDepthEight.fn)
		.add(getWithDepthTen.suiteName, getWithDepthTen.fn)
		.on("cycle", function (event) {
			console.log(String(event.target));
		})
		.on("error", function (err) {
			console.log(err);
		})
		.on("complete", function () {
			console.log("Fastest is " + this.filter("fastest").map("name"));
		})
		.run({ async: true });
}

run();
