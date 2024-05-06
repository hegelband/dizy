import SessionContainer from "./SessionContainer.js";
import SingletoneContainer from "./SingletoneContainer.js";
import DemandedFactory from "./DemandedFactory.js";
import DIObjectKeyFactory from "./helpers/DIObjectKeyFactory.js";
import LifecycleEnum from "../constants/LifecycleEnum.js";
import AbstractContextContainer from "./AbstractContextContainer.js";
import generateRandomString from "../utils/generateRandomString.js";

class NotUniqueContextContainerName extends Error {
    constructor(name) {
        super(`Context name '${name}' is not unique. Context name must be unique string.`);
    }
}

class InvalidContextContainerNameType extends Error {
    constructor() {
        super(`Invalid context name type. Type of context name must be a string.`);
    }
}

class InvalidContextChild extends Error {
    constructor() {
        super("Invalid context child. Child must be an instance of AbstractContextContainer or it's derived class, null or undefined.");
    }
}

class ContextContainer extends AbstractContextContainer {
    constructor(config = [], name = '', parent = null, keyFactory = new DIObjectKeyFactory()) {
        if (name === '') {
            name = generateRandomString(7);
        }
        super(config, name, parent, keyFactory);
        ContextContainer.#addName(name);
        // this.#parent = parent;
        if (parent instanceof AbstractContextContainer) {
            parent.addChildren(this);
        }
        // this.#keyFactory = keyFactory;
    }

    static #names = new Set();
    static #addName(name) {
        if (typeof name !== 'string') {
            throw new InvalidContextContainerNameType();
        }
        if (this.#names.has(name)) {
            throw new NotUniqueContextContainerName(name);
        }
        this.#names.add(name);
    }

    // #parent;
    // #keyFactory;
    #children = new Map();

    scopes = new Map();

    _createScopes() {
        // sort scopes initialization order by desc of lifecycle id (order: Demanded -> Singletone -> Session -> Persistent)
        const scopesTypes = new Set(this.classTreeList.map(cls => cls.baseNode.lifecycle).sort((a, b) => b.id - a.id));
        scopesTypes.forEach(lifecycle => {
            switch (lifecycle.id) {
                // case LifecycleEnum.Persistent:
                //     this.scopes.set(lifecycle, new PersistentContainer(this, this.filterClassesByLifecycle(LifecycleEnum.Persistent)));
                //     console.log(this.scopes);
                //     break;
                case LifecycleEnum.Session:
                    this.scopes.set(lifecycle.id, new SessionContainer(this, this.filterClassesByLifecycle(LifecycleEnum.Session)));
                    // console.log(this.scopes);
                    break;
                case LifecycleEnum.Singletone:
                    this.scopes.set(lifecycle.id, new SingletoneContainer(this, this.filterClassesByLifecycle(LifecycleEnum.Singletone)));
                    break;
                case LifecycleEnum.Demanded:
                    this.scopes.set(lifecycle.id, new DemandedFactory(this, this.filterClassesByLifecycle(LifecycleEnum.Demanded)));
                    break;
                default:
                    break;
            }
        });
    }

    _initScopes() {
        this.scopes.forEach((scope) => {
            if (scope.init) {
                scope.init();
            }
        })
    }

    hasInstance(name, lifecycleId) {
        const classTree = this._findClassTree(name, lifecycleId);
        const scope = this.getScope(classTree.baseNode.lifecycle.id);
        if (classTree.baseNode.lifecycle.id === LifecycleEnum.Demanded) return false;
        if (scope.getInstance(classTree.baseNode.key)) return true;
    }

    getInstance(name, lifecycleId, calledFromScope) {
        const clazz = this._findClassTree(name, lifecycleId);
        if (clazz === undefined) {
            if (calledFromScope) return undefined;
            return this.#getChildInstance(name, lifecycleId);
        };
        const key = clazz.baseNode.key;
        const scope = this.getScope(clazz.baseNode.lifecycle.id);
        if (!scope) {
            if (calledFromScope) return undefined;
            return this.#getChildInstance(name, lifecycleId);
        };
        if (scope instanceof DemandedFactory) return scope.createInstance(key);
        return calledFromScope
            ? scope.getInstance(key)
            : scope.getInstance(key) ?? this.#getChildInstance(name, lifecycleId);
    }

    #getChildInstance(name, lifecycleId) {
        let instance;
        const childContext = [...this.#children.values()].find(context => {
            instance = context.getInstance(name, lifecycleId);
            return instance !== undefined;
        });
        return childContext ? instance : undefined;
    }

    typeMatch(name, type) {
        // is DI object with name instance of type
        const clazz = this._findClassTree(name);
        return clazz.baseNode.type === type;
    }

    getScope(lifecycleId) {
        if (typeof lifecycleId !== 'number' || !Object.values(LifecycleEnum).find(v => v === lifecycleId)) {
            return null;
        }
        return this.scopes.get(lifecycleId);
    }

    getChildren() {
        return this.#children;
    }

    addChild(childContext) {
        if (!(childContext instanceof AbstractContextContainer)) {
            throw new InvalidContextChild();
        }
        this.#children.set(childContext.name, childContext);
    }

    deleteChild(childName) {
        this.#children.delete(childName);
    }
}

export default ContextContainer;
