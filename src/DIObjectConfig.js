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
        const message = `There is no registered lifecycle with id = ${lifecycle}.`;
        super(message);
        this.name = 'InvalidDIObjectLifecycle';
    }
}

export const DIObjectLifecycle = {
    Persistent: 0,
    Session: 1,
    Singletone: 2,
    Demanded: 3,
};

class DIObjectConfig {
    constructor(name = '', type = {}, lifecycle = DIObjectLifecycle.Session) {
        this.name = name;
        this.type = type;
        this.lifecycle = lifecycle;
    }
};


export default DIObjectConfig;
