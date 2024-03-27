import Animal from './Animal.js';

class Man {
    constructor(animal) {
        // console.log('man with ', animal);
    }
}

export class Simple {
    constructor(xyz = Man) {
        console.log('simple with man with default value ', xyz);
        this.person = xyz;
    }
}

export default Man;
