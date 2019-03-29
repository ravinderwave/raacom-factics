/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('EmotionCapturedCtrl', EmotionCapturedCtrl);

  /** @ngInject */
  function EmotionCapturedCtrl($scope, baConfig, colorHelper, $http) {

      $scope.transparent = baConfig.theme.blur;
	  
      var dashboardColors = baConfig.colors.dashboard;
      
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
        var array=[];
        var array1=[];
		var percentage=[];
        $http.get('http://raacom-factics-api.com/detected', data, config).
        then(function(response) {
            var emotions = response.data;
            
            for(var i=0; i<emotions.length ;i++){
              array.push(emotions[i]['emotion']);
            }

            var unique = array_unique(array);
            
            var count_emotions = count_values(array);
            //alert(unique[0]);
            for(var j=0; j<unique.length; j++){
                var un = unique[j];
				array1.push(count_emotions[un]*1);
				
				var per = (count_emotions[un]*1*100)/emotions.length;
				
				percentage.push(Math.round(per));
            }
            console.log(array1);
            emotion_data(unique, emotions.length, array1, percentage);  
        });
        
        function emotion_data(unique, total_expressions, array, percentage){
            $scope.doughnutData = {
                labels: unique,
                datasets: [
                    {
                        data: array,
                        backgroundColor: [
                            dashboardColors.blueStone,
                            dashboardColors.surfieGreen,
                            dashboardColors.silverTree
                        ],
                        hoverBackgroundColor: [
                            colorHelper.shade(dashboardColors.blueStone, 15),
                            colorHelper.shade(dashboardColors.surfieGreen, 15),
                            colorHelper.shade(dashboardColors.silverTree, 15)
                        ],
                        percentage: percentage
                    }
                ]
            };
            
            $scope.total = total_expressions;
            
            var ctx = document.getElementById('chart-area').getContext('2d');
            window.myDoughnut = new Chart(ctx, {
                type: 'doughnut',
                data: $scope.doughnutData,
                options: {
                    cutoutPercentage: 64,
                    responsive: true,
                    elements: {
                        arc: {
                            borderWidth: 0
                        }
                    }
                }
            });
        }
        
        function count_values(array){
            array.sort();

            var current = null;
            var tmpArr = []
            var cnt = 0;
            for (var i = 0; i < array.length; i++) {
                if (array[i] != current) {
                    if (cnt > 0) {
                         tmpArr[current]=cnt;
                        //document.write(current + ' comes --> ' + cnt + ' times<br>');
                    }
                    current = array[i];
                    cnt = 1;
                    
                } else {
                    cnt++;
                }
                tmpArr[current]=cnt;
            } 
            return tmpArr;
        }
        
        function array_unique (inputArr) {
            var key = ''
            var tmpArr2 = []
            var val = ''

            var _arraySearch = function (needle, haystack) {
              var fkey = ''
              for (fkey in haystack) {
                if (haystack.hasOwnProperty(fkey)) {
                  if ((haystack[fkey] + '') === (needle + '')) {
                    return fkey
                  }
                }
              }
              return false
            }

            for (key in inputArr) {
              if (inputArr.hasOwnProperty(key)) {
                val = inputArr[key]
                if (_arraySearch(val, tmpArr2) === false) {
                  tmpArr2[key] = val
                }
              }
            }

            return tmpArr2
        }
  }
})();