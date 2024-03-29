class DIContainer {
    constructor(classTreeList = []) {
        this.classTreeList = classTreeList;
    }


    // _createInstance() { } // protected method

    hasInstance() { }

    getInstance() { }

    filterInstances() { }

    getParent() { }

    typeMatch(key, type) {
        // is DI object with key instance of type
    }
}

export default DIContainer;
