
(function () {
    'use strict';
  
    var app=angular.module('BlurAdmin.pages.visit', [])
        .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
          .state('visit', {
            url: '/visit',
            controller:'VisitTabCtrl',
            scope:false,
            templateUrl: 'app/pages/visit/visit.html',
            title: 'Gallery Visit',
            sidebarMeta: {
              order: 800,
            },
          });
    }
  
    /** @ngInject */
    app.controller('VisitTabCtrl', ['$scope', '$http', function ($scope, $http) {     
      $http.get('http://raacom-factics-api.com/galleryvisit').
      then(function(response) {
        //console.log(response.data);
          $scope.galleryvisit=response.data
          //return $scope.result = response.data;
      }); 
  }]);
  
  })();