/**
 * @author a.demeshko
 * created on 12/16/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .controller('dashboardMorrisCtrl', dashboardMorrisCtrl);

  /** @ngInject */
  function dashboardMorrisCtrl($scope, $window, baConfig, $http) {
    var layoutColors = baConfig.colors;
    $scope.colors = [layoutColors.primary, layoutColors.warning, layoutColors.danger, layoutColors.info, layoutColors.success, layoutColors.primaryDark];
    
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
        var maledata = response.data.male;
        var femaledata = response.data.female; 
        var visitorsdata = response.data.visitor; 
        var timeData = response.data.time;
        var value = [];
        for(var i=0; i<timeData.length ;i++){
            value.push({y:timeData[i], a:maledata[i], b:femaledata[i], c:visitorsdata[i]});
        }
        
        var morris_value = JSON.stringify(value);
        
        morris_data(morris_value);
        
        $scope.morris_value;
    });
    
    function morris_data(morris_value){
        $scope.areaData = morris_value;
    }
    
    angular.element($window).bind('resize', function () {
      //$window.Morris.Grid.prototype.redraw();
    });
  }

})();