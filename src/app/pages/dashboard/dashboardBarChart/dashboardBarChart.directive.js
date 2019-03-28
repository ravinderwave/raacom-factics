/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardBarChart', dashboardBarChart);

  /** @ngInject */
  function dashboardBarChart() {
    return {
      restrict: 'E',
      controller: 'DashboardBarChartCtrl',
      templateUrl: 'app/pages/dashboard/DashboardBarChart/dashboardBarChart.html'
    };
  }
})();