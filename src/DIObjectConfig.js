import DemandedLifecycle from "./lifecycle/DemandedLifecycle.js";
import SessionLifecycle from "./lifecycle/SessionLifecycle.js";
import SingletoneLifecycle from "./lifecycle/SingletoneLifecycle.js";

export class InvalidDIObjectName extends Error {
    constructor(name) {
        const message = `DI object name { ${name} } is invalid. Name must be a not empty string`;
        super(message);
        this.name = 'InvalidDIObjectName';
    }
}

export class InvalidDIObjectParent extends Error {
    constructor() {
        const message = 'DI object parent must be an instance of ContextContainer.';
        super(message);
        this.name = 'InvalidDIObjectParent';
    }
}

export class InvalidDIObjectLifecycle extends Error {
    constructor(lifecycle) {
        const message = `There is no registered lifecycle with id = ${lifecycle.id}.`;
        super(message);
        this.name = 'InvalidDIObjectLifecycle';
    }
}

export class DIObjectConfig {
    constructor(name, type, lifecycle) {
        this.name = name;
        this.type = type;
        this.lifecycle = lifecycle;
    }
};

export class DemandedConfig extends DIObjectConfig {
    constructor(
        name = '',
        type = {},
        beforeCreate = () => { },
        afterCreate = () => { }
    ) {
        super(name, type, new DemandedLifecycle(beforeCreate, afterCreate));
    }
}

export class SingletoneConfig extends DIObjectConfig {
    constructor(
        name = '',
        type = {},
        beforeCreate = () => { },
        afterCreate = () => { }
    ) {
        super(name, type, new SingletoneLifecycle(beforeCreate, afterCreate));
    }
}

export class SessionConfig extends DIObjectConfig {
    constructor(
        name = '',
        type = {},
        beforeCreate = () => { },
        afterCreate = () => { }
    ) {
        super(name, type, new SessionLifecycle(beforeCreate, afterCreate));
    }
}
