/**
 * @author a.demeshko
 * created on 12/16/15
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardBarChartCtrl', DashboardBarChartCtrl);

    /** @ngInject */
    function DashboardBarChartCtrl($scope, $http, $window, baConfig) {
        
        var layoutColors = baConfig.colors;
        $scope.colors = [layoutColors.primary, layoutColors.warning, layoutColors.danger, layoutColors.info, layoutColors.success, layoutColors.primaryDark];
        
        var config = {
            headers : {
                'Content-Type': 'application/json;'
            }
        }

        var data = JSON.stringify({
            "apiKey":"asdasdasdasdasda",
            "command":"AgeGenderChart",
            "entity": "gallery",
            "viewData":{
               "fieldSet":{
                  "id":"Ethnicity"
               },
               "whereFieldset":[
               ],
               "paging":{
                  "Offset":0,
                  "Limit":10
               }
            }
        });
    
        $http.post('http://raacom-factics-api.com/charts', data, config).
            then(function(response) {
                var maledata = response.data.male;
                var femaledata = response.data.female; 
                var timeData = response.data.time;
                var value = [];
                for(var i=0; i<timeData.length ;i++){
                    value.push({y:timeData[i], a:maledata[i], b:femaledata[i]});
                }
                var morris_value1 = JSON.stringify(value);
        
                morris_data1(morris_value1);

                $scope.morris_value1;
            });

            function morris_data1(morris_value1){
                $scope.barData = morris_value1;
            }
            angular.element($window).bind('resize', function () {
                //$window.Morris.Grid.prototype.redraw();
            });
    }
})();