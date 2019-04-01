
(function () {
  'use strict';

	var app=angular.module('BlurAdmin.pages.events', [])
      .config(routeConfig);

		/** @ngInject */
	function routeConfig($stateProvider) {
	$stateProvider
		.state('events', {
		  url: '/events',
		  controller:'EventTabCtrl',
		  scope:false,
		  templateUrl: 'app/pages/events/events.html',
		  title: 'Events',
		  sidebarMeta: {
			  icon: 'fa fa-flag-o',
			order: 800,
		  },
		});
	}

	/** @ngInject */
	app.controller('EventTabCtrl', ['$scope', '$http','$interval', function ($scope,$http,$interval) {    
		$http.get('http://raacom-factics-api.com/unattended').
		then(function(response) {
			$scope.unattended=response.data;
			console.log(response.data);
		}); 

		$http.get('http://raacom-factics-api.com/galleryvisit').
		then(function(response) {
			$scope.galleryvisit=response.data;
		}); 

		$interval(function(){

			$http.get('http://raacom-factics-api.com/unattended').
			then(function(response) {
				$scope.unattended=response.data;
			}); 

			$http.get('http://raacom-factics-api.com/galleryvisit').
			then(function(response) {
				$scope.galleryvisit=response.data;
			}); 
		},12000);

		$scope.removeEventsUnattended = function(id,idx){
            
			var jsons=JSON.stringify({ 
				apiKey:"445dcfa295847ebbb77011ab264b4aa9",
				command:"unattend",
				lang:"en",
				deviceId:"en2",
				viewData:{
					fieldSet:{
						 id:id
					},
					whereFieldset:[
					],
					paging:{
						 Offset:0,
						 Limit:10
					}
			 }
		})
		
		console.log(jsons);

		var onSuccess = function (data, status, headers, config) {
			
					//location.reload();
					$scope.unattended.splice(idx, 1);
					console.log('yes')
			
		};

		var onError = function (data, status, headers, config) {
			//location.reload();
			$scope.unattended.splice(idx, 1);
			console.log('no')
		}

	 $http.post('http://raacom-factics-api.com/deleteUnattended', jsons)
				.success(onSuccess)
				.error(onError);



	}


	$scope.removeEventsGallery = function(id,idx){
			
	 var jsons=JSON.stringify({ 
		 apiKey:"445dcfa295847ebbb77011ab264b4aa9",
		 command:"visit",
		 lang:"en",
		 deviceId:"en2",
		 viewData:{
			 fieldSet:{
					id:id
			 },
			 whereFieldset:[
			 ],
			 paging:{
					Offset:0,
					Limit:10
			 }
		}
 })
 
 console.log(jsons);

 var onSuccess = function (data, status, headers, config) {
	 
			 //location.reload();
			 $scope.galleryvisit.splice(idx, 1);
			 console.log('yes')
	 
 };

 var onError = function (data, status, headers, config) {
	 //location.reload();
	 $scope.galleryvisit.splice(idx, 1);
	 console.log('no')
 }

$http.post('http://raacom-factics-api.com/deleteVisits', jsons)
		 .success(onSuccess)
		 .error(onError);



}

	}]);
	
})();