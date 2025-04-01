class Model {

    constructor() {
        if(this.constructor === Model) {
            throw new Error('Cannot instantiate abstract class ' + this.constructor.name );
        }
    }

    toJson() {
        throw new Error('Abstract method not implemented');
    }

    fromJson() {
        throw new Error('Abstract method not implemented');
    }

}