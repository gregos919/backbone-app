import Backbone from 'backbone';
import $ from 'jquery';
import Sales from '../collections/Sales';
import Highcharts from 'highcharts';

class ChartView extends Backbone.View {
  constructor(){
    super();
    this.el = '#chartContainer';

    Backbone.View.apply(this);

    setTimeout(() => {
      this.render();
    }, 0)
  }

  render() {
    Highcharts.chart(this.el, {

      title: {
        text: 'Sales over time'
      },

      subtitle: {
        text: '1980 - 2000'
      },

      yAxis: {
        title: {
          text: 'Sales'
        },
        labels: {
          formatter: function () {
            return '$' + this.axis.defaultLabelFormatter.call(this);
          }
        }
      },
      tooltip: {
        formatter: function() {
          return '<b>$'+ Highcharts.numberFormat(this.y, 0) +'</b><br/>'+
              'in year: '+ this.x;
        }
      },

      xAxis: {
        title: {
          text: 'Year'
        },
        categories: Sales.pluck("year")
      },

      colors: ['#e55100'],

      series: [{
        name: "Sales",
        data: Sales.pluck("sales")
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 700
          },
          chartOptions: {
            legend: {
              enabled: false
            }
          }
        }]
      }

    });
  }
}
export default ChartView;
