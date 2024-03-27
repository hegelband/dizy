export const DIObjectLifecycle = {
    Persistent: 0,
    Session: 1,
    Singletone: 2,
    Prototype: 3,
    Demanded: 4,
};

class DIObjectConfig {
    constructor(name = '', type = {}, lifecycle = DIObjectLifecycle.Session) {
        this.name = name;
        this.type = type;
        this.lifecycle = lifecycle;
    }
};


export default DIObjectConfig;
