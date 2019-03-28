/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.gallery')
      .directive('gallery', gallery);

  /** @ngInject */
  function gallery() {
    return {
      restrict: 'E',
      controller: 'GalleryCtrl',
      templateUrl: 'app/pages/gallery/gallery.html'
    };
  }
})();