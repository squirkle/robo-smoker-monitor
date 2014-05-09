Monitor.ReportsView = Ember.View.extend({
  didInsertElement: function() {
    // startup chart
    this.get('chartEvents');

    var $this = this.$(),
        that = this;

    this.set('seriesIndex', ['pit', 'output', 'targetTemp']);

    var chart = $this.highcharts({
      chart: {
        zoomType: 'x',
        animation: Highcharts.svg,
        events: {
          load: function () {
            var index = that.get('seriesIndex');
            this.series.forEach(function (series, i) {
              that.set(index[i], series);
            });
            that.set('chart', this);
          }
        }
      },
      xAxis: [{
        type: 'datetime'
      }],
      yAxis: [{
        labels: {
          format: '{value}°F'
        },
        title: {
          text: 'Temperature'
        }
      }, {
        title: {
          text: 'Output'
        },
        opposite: true
      }],
      series: [{
        type: 'areaspline',
        name: 'Pit Temperature',
        marker: { enabled: false },
        data: that.get('controller').get('pit'),
        yAxis: 0
      }, {
        type: 'spline',
        name: 'Fan Output Level',
        marker: { enabled: false },
        data: that.get('controller').get('output'),
        yAxis: 1
      }, {
        type: 'line',
        name: 'Pit Target Temperature',
        marker: { enabled: false },
        data: that.get('controller').get('targetTemp'),
        yAxis: 0
      }]
    });
  },
  chartEvents: Ember.arrayComputed('controller.model', {
    addedItem: function (a, item) {
      // events to fire if chart has already loaded
      var chart = this.get('chart');
      if (!chart) { return; }
      var index = this.get('seriesIndex');
      index.forEach(function (key, i) {
        var last = this.get('controller').get(key).get('lastObject');
        console.log(key, last);
        chart.series[i].addPoint(last);
      }, this);
    },
    initialize: function () {
      var chart = this.get('chart');
      if (!chart) { return; }
      chart.series.forEach(function (series) {
        series.setData([]);
      });
    }
  })
});
