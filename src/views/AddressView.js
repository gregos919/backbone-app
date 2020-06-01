import Backbone from 'backbone';
import AddressList from '../templates/AddressList.hbs';
import Handlebars from 'handlebars';

class AddressView extends Backbone.View {
  constructor(options){
    super(options);
    this.template = Handlebars.compile(AddressList);

    Backbone.View.apply(this);
    this.render();
  }

  render() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
}

export default AddressView;
