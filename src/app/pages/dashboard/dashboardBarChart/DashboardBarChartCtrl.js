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
                //console.log(response);
                var data=response.data;
                var age_1=data["0.0 - 20"];
                var age_2=data["21 - 40"];
                var age_3=data["41 - 60"];
                var age_4=data["61 - 80"];
                var age_5=data["81 - 100"];
                //console.log(age_1);
//                var maledata = response.data.male;
//                var femaledata = response.data.female; 
                var timeData = response.data.time;
                var value = [];
                for(var i=0; i<timeData.length ;i++){
                    value.push({y:timeData[i], a:age_1[i], b:age_2[i],c:age_3[i],d:age_4[i],e:age_5[i]});
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
