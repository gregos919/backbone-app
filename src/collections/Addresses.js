import Backbone from 'backbone';
import Address from '../models/Address';

class AddressesCollection extends Backbone.Collection {
    constructor(options) {
        super(options);

        this.model = Address;
        Backbone.Collection.apply(this);

    }
}

export default new AddressesCollection();
