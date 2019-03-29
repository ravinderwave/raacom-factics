/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('emotionCaptured', emotionCaptured);

  /** @ngInject */
  function emotionCaptured() {
    return {
      restrict: 'E',
      controller: 'EmotionCapturedCtrl',
      templateUrl: 'app/pages/dashboard/emotionCaptured/emotionCaptured.html'
    };
  }
})();