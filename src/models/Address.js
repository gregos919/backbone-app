import Backbone from 'backbone';

class Address extends Backbone.Model {
    constructor() {
        super(...arguments);

        this.defaults = {
            name: '',
            phone: '',
            address: ''
        };

        Backbone.Model.apply(this);
    }

    validate(attrs, options) {
        const swissPhoneRegex = /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/;
        const match = attrs.phone.match(swissPhoneRegex);

        if(!match) {
            return 'Not valid Swiss number'
        }
    }
}


export default Address;
