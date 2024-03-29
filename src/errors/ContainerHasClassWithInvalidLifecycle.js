class ContainerHasClassWithInvalidLifecycle extends Error {
    constructor(containerScope, clazz) {
        this.message = `${containerScope}Container's classTreeList arg has class { ${clazz.name} } with another lifecycle.`;
        super(this.message);
        this.name = 'DI Container has class with invalid lifecycle type';
    }
}

export default ContainerHasClassWithInvalidLifecycle;
