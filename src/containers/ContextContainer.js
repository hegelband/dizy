import SessionContainer from "./SessionContainer.js";
import SingletoneContainer from "./SingletoneContainer.js";
import DemandedFactory from "./DemandedFactory.js";
import DIObjectKeyFactory from "./helpers/DIObjectKeyFactory.js";
import LifecycleEnum from "../constants/LifecycleEnum.js";
import AbstractContextContainer from "./AbstractContextContainer.js";

class ContextContainer extends AbstractContextContainer {
    constructor(config = [], name = '', parent = null, keyFactory = new DIObjectKeyFactory()) {
        super(config, name, parent, keyFactory);
        this.#parent = parent;
        this.#keyFactory = keyFactory;
    }

    #parent;
    #keyFactory;

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
                    console.log('done');
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

    getInstance(name, lifecycleId) {
        const clazz = this._findClassTree(name, lifecycleId);
        const key = clazz.baseNode.key;
        const scope = this.getScope(clazz.baseNode.lifecycle.id);
        if (!scope) return undefined;
        if (scope instanceof DemandedFactory) return scope.createInstance(key);
        return scope.getInstance(key);
    }

    typeMatch(name, type) {
        // is DI object with name instance of type
        const clazz = this._findClassTree(name);
        return clazz.baseNode.type === type;
    }

    getScope(lifecycleId) {
        if (typeof lifecycleId !== 'number' || lifecycleId < LifecycleEnum.Persistent || lifecycleId > LifecycleEnum.Demanded) {
            return null;
        }
        return this.scopes.get(lifecycleId);
    }
}

export default ContextContainer;
