/**
 * @author a.demeshko
 * created on 12/16/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .controller('DashboardPolarChartCtrl', DashboardPolarChartCtrl);

  /** @ngInject */
  function DashboardPolarChartCtrl($scope, baConfig, $http,$interval) {
    var layoutColors = baConfig.colors;
    
    var config = {
        headers : {
            'Content-Type': 'application/json;'
        }
    }

    var data = JSON.stringify({
        "apiKey":"asdasdasdasdasda",
        "command":"EthnicGenderChart",
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
    
    var asian=0;
    var black=0;
    var caucasian=0;
    var male=0;
    var female=0;
    
    $http.post('http://raacom-factics-api.com/charts', data, config).
        then(function(response) {
            var maledata = response.data.male;
            var femaledata = response.data.female; 
            var asianData = response.data.asian; 
            var blackData = response.data.black;
            var caucasianData = response.data.caucasian;
            var timeData = response.data.time;
            
            for(var i=0; i<timeData.length ;i++){
              asian+=asianData[i];
              black+=blackData[i];
              caucasian+=caucasianData[i];
              male+=maledata[i];
              female+=femaledata[i];
            }
            
            polar_data(asian, black, caucasian);
            
        });

        $interval(function(){
            var config = {
                headers : {
                    'Content-Type': 'application/json;'
                }
            }
            
        
            var data = JSON.stringify({
                "apiKey":"asdasdasdasdasda",
                "command":"EthnicGenderChart",
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
            var asian=0;
            var black=0;
            var caucasian=0;
            var male=0;
            var female=0;
    
            $http.post('http://raacom-factics-api.com/charts', data, config).
            then(function(response) {
                var maledata = response.data.male;
                var femaledata = response.data.female; 
                var asianData = response.data.asian; 
                var blackData = response.data.black;
                var caucasianData = response.data.caucasian;
                var timeData = response.data.time;
                
                for(var i=0; i<timeData.length ;i++){
                  asian+=asianData[i];
                  black+=blackData[i];
                  caucasian+=caucasianData[i];
                  male+=maledata[i];
                  female+=femaledata[i];
                }
                
                polar_data(asian, black, caucasian);
                
            });
        },23000)
        function polar_data(asian, black, caucasian){
            $scope.labels =["Asian", "Black", "Caucasian"];
            $scope.data = [asian, black, caucasian];
            $scope.options = {
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                },
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        fontColor: layoutColors.defaultText
                    }
                }
            };
            $scope.colors = [layoutColors.blueStone, layoutColors.surfieGreen, layoutColors.silverTree, layoutColors.gossip, layoutColors.primaryDark, layoutColors.transwhite];
            
            $scope.changeData = function () {
              $scope.data = shuffle($scope.data);
            };
        }


    function shuffle(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x){}
      return o;
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
  }

})();