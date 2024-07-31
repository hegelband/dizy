import { assert } from "chai";
import InstancesMap from "../containers/helpers/InstancesMap.js";

describe("InstancesMap", () => {
	const instances = new InstancesMap();

	describe("InstancesMap.get()", () => {
		it("getting an element by a symbol key, that exist in InstancesMap", () => {
			const key = Symbol.for({ name: 'dizy' });
			instances.set(key, { name: 'dizy' });
			assert.deepEqual(instances.get(key), { name: 'dizy' });
		});

		it("getting an element by a object key, that exist in InstancesMap", () => {
			instances.set({ name: 'dizy-obj' }, { name: 'dizy' });
			assert.deepEqual(instances.get({ name: 'dizy-obj' }), { name: 'dizy' });
		});

		it("getting an element by a simple key, that exist in InstancesMap", () => {
			const key = 'dizy';
			instances.set(key, { name: 'dizy' });
			assert.deepEqual(instances.get(key), { name: 'dizy' });
		});

		it("getting an element by a simple key, that don't exist in InstancesMap - undefined", () => {
			const key = 'dizy';
			instances.set(key, { name: 'dizy' });
			assert.deepEqual(instances.get(key), { name: 'dizy' });
		});
	});

	describe("InstancesMap.has()", () => {
		it("returns a boolean indicating whether an element, that was added in InstancesMap, with the symbol key exists in this map", () => {
			const key = Symbol.for({ name: 'dizy' });
			instances.set(key, { name: 'dizy' });
			assert.equal(instances.has(key), true);
		});

		it("returns a boolean indicating whether an element, that was added in InstancesMap, with the object key exists in this map", () => {
			instances.set({ name: 'dizy' }, { name: 'dizy' });
			assert.equal(instances.has({ name: 'dizy' }), true);
		});

		it("returns a boolean indicating whether an element, that was added in InstancesMap, with the simple key exists in this map", () => {
			instances.set('dizy', { name: 'dizy' });
			assert.equal(instances.has('dizy'), true);
		});
	});
});
