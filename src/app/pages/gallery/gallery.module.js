(function () {
  'use strict';

  angular.module('BlurAdmin.pages.gallery', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
	$stateProvider
        .state('gallery', {
          url: '/gallery',
          templateUrl: 'app/pages/gallery/gallery.html',
          title: 'Gallery',
          sidebarMeta: {
            order: 800,
          },
        });
  }

})();