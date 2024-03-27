class NotAllowedDIObjectType extends Error {
    constructor(type) {
        this.name = 'Invalid DI Object type.'
        this.message = `Not allowed DI object type of ${type.constructor.name}. DI object must be class or function.`;
        super(this.message);
    }
}

function parseType(type) {
    if (typeof type !== 'function') {
        throw new NotAllowedDIObjectType(type);
    };
    const typeStr = type.toString();
    return typeStr.startsWith('class') ? 'class' : 'function';
}

export default parseType;
