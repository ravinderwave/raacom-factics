/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardVisitorsChart', dashboardVisitorsChart);

  /** @ngInject */
  function dashboardVisitorsChart() {
    return {
      restrict: 'E',
      controller: 'DashboardVisitorsChartCtrl',
      templateUrl: 'app/pages/dashboard/dashboardVisitorsChart/dashboardVisitorsChart.html'
    };
  }
})();