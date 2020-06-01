import Backbone from 'backbone';
import AddressView from './AddressView';
import Addresses from '../collections/Addresses';
import $ from 'jquery';
import Address from "../models/Address";
import MicroModal from 'micromodal';

class AppView extends Backbone.View {
  constructor(){
    super();
    this.el = '#addressBook';
    this.events = {
      'submit #newAddressForm': 'addNewAddress',
      'click .open-modal': 'openModal',
    };

    this.$nameInput = $('#name');
    this.$addressInput = $('#address');
    this.$phoneInput = $('#phone');

    this.$list = $('#render-list');

    this.listenTo(Addresses, 'add', this.renderAddress);
    this.listenTo(Addresses, 'add', this.checkForLimit);

    this.initializeModal();
    Backbone.View.apply(this);
  }

  initializeModal() {
    MicroModal.init();
  }

  openModal() {
    MicroModal.show('modal-1');
  }

  hideModal() {
    MicroModal.close('modal-1');
    this.$nameInput.val('');
    this.$addressInput.val('');
    this.$phoneInput.val('');
  }

  addNewAddress(e) {
    e.preventDefault();
    const addressModel = new Address();
    addressModel.set('name', this.$nameInput.val());
    addressModel.set('address', this.$addressInput.val());
    addressModel.set('phone', this.$phoneInput.val());

    $('#phoneError').remove();

    if (!addressModel.isValid()) {
      $('#phone').parent().append(`<p id="phoneError" class="error">${addressModel.validationError}</p>`);
      return;
    }

    Addresses.add(addressModel, { validate: true });

    this.hideModal();
  }

  renderAddress(address) {
    $('.no-address').remove();
    const view = new AddressView({ model: address });
    this.$list.append(view.render().el);
  }

  checkForLimit() {
    if(Addresses.length >= 10){
      $('.open-modal').attr('disabled', 'disabled').text('Maximum number of addresses reached');
    }
    else {
      $('.open-modal').attr('disabled', false).text('Add new address');
    }
  }
}
export default AppView;
