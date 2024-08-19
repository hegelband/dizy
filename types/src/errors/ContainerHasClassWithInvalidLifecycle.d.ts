export default ContainerHasClassWithInvalidLifecycle;
declare class ContainerHasClassWithInvalidLifecycle extends Error {
    constructor(containerScope: any, clazz: any);
}
