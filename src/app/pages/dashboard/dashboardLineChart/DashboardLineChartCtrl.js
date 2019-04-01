/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardLineChartCtrl', DashboardLineChartCtrl);

  /** @ngInject */
  function DashboardLineChartCtrl(baConfig, layoutPaths, baUtil, $http,$interval) {
    var layoutColors = baConfig.colors;
    var graphColor = baConfig.theme.blur ? '#ffffff' : layoutColors.primary;
	
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
		var age_1=data["0.0 - 20"].reduce(add),
		age_2=data["21 - 40"].reduce(add),
		age_3=data["41 - 60"].reduce(add),
		age_4=data["61 - 80"].reduce(add),
		age_5=data["81 - 100"].reduce(add),
		age = ["0-20","20-39","40-59","60-79","80-99"],		
		age_data = [age_1, age_2, age_3, age_4, age_5];
		
		function add(accumulator, a) {
			return accumulator + a;
		}

        var chartData = [];
        for(var i=0; i<age.length ;i++){
			//var date = dateData[i].toJSON();
            chartData.push({ age: age[i], value: age_data[i] });
        }
        //console.log(arrayData);
        
        //console.log(chartData);
        amChart_data(chartData);        
        //$scope.morris_value;
		});
		
		$interval(function(){
			var config = {
        headers : {
            'Content-Type': 'application/json;'
        }
		};
		
			
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
					var age_1=data["0.0 - 20"].reduce(add),
					age_2=data["21 - 40"].reduce(add),
					age_3=data["41 - 60"].reduce(add),
					age_4=data["61 - 80"].reduce(add),
					age_5=data["81 - 100"].reduce(add),
					age = ["0-20","20-39","40-59","60-79","80-99"],		
					age_data = [age_1, age_2, age_3, age_4, age_5];
					
					function add(accumulator, a) {
						return accumulator + a;
					}
			
							var chartData = [];
							for(var i=0; i<age.length ;i++){
						//var date = dateData[i].toJSON();
									chartData.push({ age: age[i], value: age_data[i] });
							}
							//console.log(arrayData);
							
							//console.log(chartData);
							amChart_data(chartData);        
							//$scope.morris_value;
					});

		},10000);





	function amChart_data(chartData){
		var chart = AmCharts.makeChart('amchart', {
		  type: 'serial',
		  theme: 'blur',
		  marginTop: 15,
		  marginRight: 15,
		  dataProvider: chartData,
		  categoryField: 'age',
		  categoryAxis: {
			//parseDates: true,
			gridAlpha: 0,
			color: layoutColors.defaultText,
			axisColor: layoutColors.defaultText
		  },
		  valueAxes: [
			{
			  minVerticalGap: 40,
			  gridAlpha: 0,
			  color: layoutColors.defaultText,
			  axisColor: layoutColors.defaultText
			}
		  ],
		  graphs: [
			{
			  id: 'g0',
			  bullet: 'none',
			  useLineColorForBulletBorder: true,
			  lineColor: baUtil.hexToRGB(graphColor, 0.5),
			  lineThickness: 1,
			  negativeLineColor: layoutColors.danger,
			  type: 'smoothedLine',
			  valueField: 'value',
			  fillAlphas: 1,
			  fillColorsField: 'lineColor'
			}
		  ],
		  chartCursor: {
			categoryBalloonDateFormat: 'HH:MM, DD MMMM',
			categoryBalloonColor: '#4285F4',
			categoryBalloonAlpha: 0.7,
			cursorAlpha: 0,
			valueLineEnabled: true,
			valueLineBalloonEnabled: true,
			valueLineAlpha: 0.5
		  },
		  dataDateFormat: 'DD-MM-YY HH:MM',
		  export: {
			enabled: true
		  },
		  creditsPosition: 'bottom-right',
		  zoomOutButton: {
			backgroundColor: '#fff',
			backgroundAlpha: 0
		  },
		  //zoomOutText: '',
		  pathToImages: layoutPaths.images.amChart
		});

		//function zoomChart() {
		  //chart.zoomToDates(new Date(2013, 3), new Date(2014, 0));
		//}

		//chart.addListener('rendered', zoomChart);
		//zoomChart();
		//if (chart.zoomChart) {
		 // chart.zoomChart();
		//}

		
	}
  }
})();