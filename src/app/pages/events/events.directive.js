
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
            order: 800,
          },
        });
  }

  /** @ngInject */
  app.controller('EventTabCtrl', ['$scope', '$http', function ($scope, $http) {    
    $http.get('http://raacom-factics-api.com/unattended').
    then(function(response) {
        $scope.unattended=response.data;
    }); 
    
    $http.get('http://raacom-factics-api.com/galleryvisit').
      then(function(response) {
          $scope.galleryvisit=response.data;
      }); 
    
}]);
})();