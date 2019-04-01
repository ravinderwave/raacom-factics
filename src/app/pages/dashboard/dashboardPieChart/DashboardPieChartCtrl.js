/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($scope, $timeout, baConfig, baUtil, $http,$interval) {
        var config = {
            headers : {
                'Content-Type': 'application/json;'
            }
        }

        var data = JSON.stringify({
            apiKey:"445dcfa295847ebbb77011ab264b4aa9",
            command:"ChartOne",
            lang:"en",
            deviceId:"en2",
            viewData:{
                fieldSet:{

                },
                whereFieldset:{

                },
                paging:{
                    Offset:0,
                    Limit:10
                }
            }
        });
        var sum=0;
        var sum1=0;
        var visitors = 0;
        $http.post('http://raacom-factics-api.com/charts', data, config).
        then(function(response) {
            var maledata = response.data.male;
            var femaledata = response.data.female; 
            var visitorsdata = response.data.visitor; 
            for(var i=0; i<maledata.length ;i++){
              sum+=maledata[i];
            }
            
            for(var i=0; i<femaledata.length ;i++){
              sum1+=femaledata[i];
            }
            
            for(var i=0; i<visitorsdata.length ;i++){
              visitors+=visitorsdata[i];
            }
            
            chart_data(sum, sum1, visitors);
            
        });

        $interval(function(){
          var config = {
            headers : {
                'Content-Type': 'application/json;'
            }
        }

        var data = JSON.stringify({
            apiKey:"445dcfa295847ebbb77011ab264b4aa9",
            command:"ChartOne",
            lang:"en",
            deviceId:"en2",
            viewData:{
                fieldSet:{

                },
                whereFieldset:{

                },
                paging:{
                    Offset:0,
                    Limit:10
                }
            }
        });
        var sum=0;
        var sum1=0;
        var visitors = 0;
        $http.post('http://raacom-factics-api.com/charts', data, config).
        then(function(response) {
            var maledata = response.data.male;
            var femaledata = response.data.female; 
            var visitorsdata = response.data.visitor; 
            for(var i=0; i<maledata.length ;i++){
              sum+=maledata[i];
            }
            
            for(var i=0; i<femaledata.length ;i++){
              sum1+=femaledata[i];
            }
            
            for(var i=0; i<visitorsdata.length ;i++){
              visitors+=visitorsdata[i];
            }
            
            chart_data(sum, sum1, visitors);
            
        });
        },15000);
        
    function chart_data(sum, sum1){
        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
        $scope.charts = [{
          color: pieColor,
          description: 'Spotted Visitors',
          stats: visitors,
          icon: 'avatar',
        }, {
          color: pieColor,
          description: 'Spotted Males',
          stats: sum,
          icon: 'user',
        }, {
          color: pieColor,
          description: 'Spotted Females',
          stats: sum1,
          icon: 'woman',
        }
        ];
    }

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {
      $('.chart').each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });

      $('.refresh-data').on('click', function () {
        updatePieCharts();
      });
    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function(index, chart) {
        $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
      });
    }

    $timeout(function () {
      loadPieCharts();
      updatePieCharts();
    }, 1000);
  }
})();