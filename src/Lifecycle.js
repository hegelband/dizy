class NotImplementedException extends Error {
    constructor() {
        this.message = 'Not implemented error';
        super(this.message);
    }
}

class Lifecycle {
    constructor() {

    }

    beforeCreate() {
        throw new NotImplementedException();
    };

    afterCreate() {
        throw new NotImplementedException();
    }

}

export default Lifecycle;
