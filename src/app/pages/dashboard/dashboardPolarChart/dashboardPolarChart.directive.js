/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardPolarChart', dashboardPolarChart);

  /** @ngInject */
  function dashboardPolarChart() {
    return {
      restrict: 'E',
      controller: 'DashboardPolarChartCtrl',
      templateUrl: 'app/pages/dashboard/dashboardPolarChart/DashboardPolarChart.html'
    };
  }
})();