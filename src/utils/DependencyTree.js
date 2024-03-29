class DependencyTree {
    constructor(baseNode) {
        this.baseNode = baseNode;
    }

    #getDepsByHeight(height, node = this.baseNode) {
        const deps = [];
        if (node.height < height) {
            node.deps.forEach((dep) => {
                deps.push(...this.#getDepsByHeight(height, dep));
            });
        } else if (node.height === height) {
            deps.push(node);
        }
        return deps;
    }

    getDepsByHeight(height) {
        return this.#getDepsByHeight(height);
    }

    groupByHeight() {
        let currentHeight = 0;
        const groups = [];
        let currentDeps = this.getDepsByHeight(currentHeight);
        while (currentDeps && currentDeps.length > 0) {
            groups.push({
                height: currentHeight,
                deps: currentDeps,
            });
            currentHeight++;
            currentDeps = this.getDepsByHeight(currentHeight);
        }
        return groups;
    }
}

export default DependencyTree;
