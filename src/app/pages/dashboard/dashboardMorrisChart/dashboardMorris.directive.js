/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardMorris', dashboardMorris);

  /** @ngInject */
  function dashboardMorris() {
    return {
      restrict: 'E',
      controller: 'dashboardMorrisCtrl',
      templateUrl: 'app/pages/dashboard/dashboardMorrisChart/dashboardMorris.html'
    };
  }
})();