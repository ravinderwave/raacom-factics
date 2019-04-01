/**
 * @author a.demeshko
 * created on 12/16/15
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardBarChartCtrl', DashboardBarChartCtrl);

    /** @ngInject */
    function DashboardBarChartCtrl($scope, $http, $window,$interval, baConfig) {
        
        var layoutColors = baConfig.colors;
        $scope.colors = [layoutColors.blueStone, layoutColors.surfieGreen, layoutColors.silverTree, layoutColors.gossip, layoutColors.primaryDark, layoutColors.transwhite];
        
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
        
    
        $http.post('http://raacom-factics-api.com/charts', data, config).
            then(function(response) {
                //console.log(response);
                var data=response.data;
				var maledata = response.data.male;
				var femaledata = response.data.female; 
				var visitorsdata = response.data.visitor;
                //console.log(age_1);
                var timeData = response.data.time;
                var value = [];
                for(var i=0; i<timeData.length ;i++){
                    value.push({y:timeData[i], a:maledata[i], b:femaledata[i],c:visitorsdata[i]});
                }
                var morris_value1 = JSON.stringify(value);
        
                morris_data1(morris_value1);

                $scope.morris_value1;
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
                
            
                $http.post('http://raacom-factics-api.com/charts', data, config).
                    then(function(response) {
                       // console.log(response);
                        var data=response.data;
                        var maledata = response.data.male;
                        var femaledata = response.data.female; 
                        var visitorsdata = response.data.visitor;
                        //console.log(age_1);
                        var timeData = response.data.time;
                        var value = [];
                        for(var i=0; i<timeData.length ;i++){
                            value.push({y:timeData[i], a:maledata[i], b:femaledata[i],c:visitorsdata[i]});
                        }
                        var morris_value1 = JSON.stringify(value);
                
                        morris_data1(morris_value1);
        
                        $scope.morris_value1;
                    });

            },20000)

            function morris_data1(morris_value1){
                $scope.barData = morris_value1;
            }
            angular.element($window).bind('resize', function () {
                //$window.Morris.Grid.prototype.redraw();
            });
    }
})();
