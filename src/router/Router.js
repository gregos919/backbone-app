import Backbone from 'backbone';
import AppView from '../views/AppView';
import ChartView from '../views/ChartView';
import $ from 'jquery';

class AppRouter extends Backbone.Router {
  constructor(args) {
    super(args);

    this.$element = {};

    this.routes = {
      '': 'addressBook',
      'chart': 'dataChart'
    };

    Backbone.Router.apply(this);
  }

  start()
  {
    Backbone.history.start({pushState: true});

    $(document).on("click", "a[data-routable='true']", (e) =>
    {

      e.preventDefault();

      let $a = $(e.currentTarget);
      let href = $a.attr("href");

      $("a[data-routable='true']").removeClass('active');
      $a.addClass('active');

      this.navigate(href, true);
      //Backbone.history.loadUrl(href, true);

    });

    return this;
  }

  addressBook() {
    $('#addressBook').show();
    $('#dataChart').hide();
    return AppView;
  }

  dataChart() {
    $('#dataChart').show();
    $('#addressBook').hide();
    return new ChartView();
  }
}

export default new AppRouter();
