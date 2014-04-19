Monitor.CookView = Ember.View.extend({
  didInsertElement: function() {
    // on element load
    var that = this,
        reports = this.get('controller.graphReports');

    var chart = $('#myChart').highcharts({
      chart: {
        events: {
          load: function () {
            that.series = this.series;
          }
        }
      },
      title: {
        text: 'Monitor'
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: [{
        labels: {
          formatter: function() {
            return this.value +'°F';
          },
          style: {
            color: '#89A54E'
          }
        },
        title: {
          text: 'Temperature',
          style: {
            color: '#89A54E'
          }
        },
        opposite: true
      }, { // Secondary yAxis
        gridLineWidth: 0,
        title: {
          text: 'Output',
          style: {
            color: '#4572A7'
          }
        },
        labels: {
          formatter: function() {
            return (this.value / 10) +' %';
          },
          style: {
            color: '#4572A7'
          }
        }
      }],
      plotOptions: {
        line: {
          marker: {
            enabled: false
          }
        },
        spline: {
          marker: {
            enabled: false
          }
        },
        areaspline: {
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        }
      },
      series: [{
        type: 'areaspline',
        name: 'pit',
        yAxis: 0,
        data: reports[0]
      }, {
        yAxis: 1,
        type: 'spline',
        name: 'output',
        data: reports[1]
      }, {
        type: 'line',
        name: 'target',
        yAxis: 0,
        data: reports[2]
      }]
    });
  },
  graph: function () {
    // update graph
    var reports = this.get('controller.graphReports');

    if (!reports.length || !this.series) { return; }

    this.series.forEach(function (el, i) {
      el.addPoint(reports[i][reports[i].length - 1]);
    });
  }.property('controller.reports.[]')
});
