/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.gallery')
      .directive('gallery', gallery);

  /** @ngInject */
  function gallery($parse){ 
        function fn_link(scope, element, attrs) {
            var onChange = $parse(attrs.ngFiles);
            element.on('change', function (event) {
                onChange(scope, { $files: event.target.files });
            });
        };
    return {
      restrict: 'E',
      controller: 'GalleryCtrl',
      templateUrl: 'app/pages/gallery/gallery.html',
      link: fn_link
    };
  }
})();