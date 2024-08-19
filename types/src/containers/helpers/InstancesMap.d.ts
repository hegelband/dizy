export default InstancesMap;
declare class InstancesMap extends Map<any, any> {
    constructor();
    get(symbolKey: any): any;
    has(symbolKey: any): boolean;
}
