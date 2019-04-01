/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('videoStream', videoStream);

  /** @ngInject */
  function videoStream() {
    return {
      restrict: 'E',
      controller: 'VideoStreamCtrl',
      templateUrl: 'app/pages/dashboard/videoStream/videoStream.html'
    };
  }
})();