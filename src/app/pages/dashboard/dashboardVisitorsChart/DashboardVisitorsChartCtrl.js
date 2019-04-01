/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardVisitorsChartCtrl', DashboardVisitorsChartCtrl);

  /** @ngInject */
  function DashboardVisitorsChartCtrl($scope, $timeout, baConfig, baUtil, $http,$interval) {
        var config = {
            headers : {
                'Content-Type': 'application/json;'
            }
        }

        var data = JSON.stringify({
            "apiKey":"445dcfa295847ebbb77011ab264b4aa9",
            "command":"Insert",
            "lang":"en",
            "deviceId":"en",
            "viewData":{
               "fieldSet":{
                 "name":"Test"
               },
               "whereFieldset":[
               ],
               "paging":{
                  "Offset":0,
                  "Limit":10
               }
            }
        });
        var sum=0;
        var sum1=0;
        var visitors = 0;
        $http.get('http://raacom-factics-api.com/unattended', data, config).
        then(function(response) {
            
            sum = response.data.length;
            
            $http.get('http://raacom-factics-api.com/galleryvisit').
            then(function(response1) {
                sum1 = response1.data.length;
                
                chart_data(sum, sum1);
            });
        });
      
        $interval(function(){
    
          

          var data = JSON.stringify({
            "apiKey":"445dcfa295847ebbb77011ab264b4aa9",
            "command":"Insert",
            "lang":"en",
            "deviceId":"en",
            "viewData":{
               "fieldSet":{
                 "name":"Test"
               },
               "whereFieldset":[
               ],
               "paging":{
                  "Offset":0,
                  "Limit":10
               }
            }
        });
        var sum=0;
        var sum1=0;
        var visitors = 0;
        $http.get('http://raacom-factics-api.com/unattended', data, config).
        then(function(response) {
            
            sum = response.data.length;
            
            $http.get('http://raacom-factics-api.com/galleryvisit').
            then(function(response1) {
                sum1 = response1.data.length;
                
                chart_data(sum, sum1);
            });
        });
      
        },20000);


    function chart_data(sum, sum1){
        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
        $scope.visitors = [{
          color: pieColor,
          description: 'Unattended',
          stats: sum,
          icon: 'person',
        }, {
          color: pieColor,
          description: 'Gallery Visitors',
          stats: sum1,
          icon: 'person',
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