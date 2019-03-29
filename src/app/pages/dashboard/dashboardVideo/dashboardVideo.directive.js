/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardVideo', dashboardVideo);

  /** @ngInject */
  function dashboardVideo() {
    return {
      restrict: 'E',
      controller: 'DashboardVideoCtrl',
      templateUrl: 'app/pages/dashboard/dashboardVideo/dashboardVideo.html'
    };
  }
})();