export default Lifecycle;
/** Abstract Class representing lifecycle of di object
 * @class
 * @abstract
 */
declare class Lifecycle {
    /**
     *
     * @param {number} id
     */
    constructor(id: number);
    id: number;
    /** Lifecycle method that's called before creation of di object's instance */
    beforeCreate(): void;
    /** Lifecycle method that's called after creation of di object's instance */
    afterCreate(): void;
}
