export default InvalidDIObjectArgDefaultValue;
declare class InvalidDIObjectArgDefaultValue extends Error {
    constructor(type: any, argName: any, defaultValue: any);
}
