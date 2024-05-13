class DependencyLoopError extends Error {
	constructor(first, second) {
		const message = `${first} requires ${second}. And ${second} requires ${first}.`;
		super(message);
		this.name = "Dependency loop error.";
	}
}

export default DependencyLoopError;
