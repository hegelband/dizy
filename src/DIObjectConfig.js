const DIObjectLifecycle = {
    Persistent: 0,
    Session: 1,
    Singleton: 2,
    Promise: 3,
    Demanded: 4,
};

class DIObjectConfig {
    constructor(name = '', type = {}, lifecycle = DIObjectLifecycle.Singleton) {
        this.name = name;
        this.type = type;
        this.lifecycle = lifecycle;
    }
};


export default DIObjectConfig;
