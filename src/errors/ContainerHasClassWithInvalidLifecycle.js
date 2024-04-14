class ContainerHasClassWithInvalidLifecycle extends Error {
    constructor(containerScope, clazz) {
        const message = `${containerScope}Container's classTreeList arg has class { ${clazz.name} } with another lifecycle.`;
        super(message);
        this.name = 'DI Container has class with invalid lifecycle type';
    }
}

export default ContainerHasClassWithInvalidLifecycle;
