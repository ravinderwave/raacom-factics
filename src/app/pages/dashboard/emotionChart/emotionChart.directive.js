/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('emotionChart', emotionChart);

  /** @ngInject */
  function emotionChart() {
    return {
      restrict: 'E',
      controller: 'EmotionChartCtrl',
      templateUrl: 'app/pages/dashboard/emotionChart/emotionChart.html'
    };
  }
})();