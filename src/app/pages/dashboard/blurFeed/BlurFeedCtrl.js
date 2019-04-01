/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('BlurFeedCtrl', BlurFeedCtrl);

  /** @ngInject */
  function BlurFeedCtrl($scope) {
	  var threshold_val='0.5';
    $scope.feed = [
      {
        author: 'http://40.122.37.245:5000/video/1/0.5/admin:admin1234@103.48.69.199:554'
      }
    ];

    $scope.changeThreshold = function(threshold){
      threshold_val = threshold;
    }
  }
})();