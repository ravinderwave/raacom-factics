/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardRadarChart', dashboardRadarChart);

  /** @ngInject */
  function dashboardRadarChart() {
    return {
      restrict: 'E',
      controller: 'DashboardRadarChartCtrl',
      templateUrl: 'app/pages/dashboard/dashboardRadarChart/DashboardRadarChart.html'
    };
  }
})();