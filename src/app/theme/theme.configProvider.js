/**
 * Created by k.danovsky on 13.05.2016.
 */

(function () {
  'use strict';

  var basic = {
    default: '#ffffff',
    defaultText: '#ffffff',
    border: '#eeeeee',
    borderDark: '#cccccc',
  };

  // main functional color scheme
  var colorScheme = {
    primary: '#1b70ef',
    info: '#1ebbd7',
    success: '#02ba5a',
    warning: '#fba540',
    danger: '#f5365c',
	blueStone: '#1b70ef',
    surfieGreen: '#3c4eb9',
    silverTree: '#00abff',
    gossip: '#40daf1',
    transwhite: 'rgba(255,255,255,.3)',
    semiwhite: 'rgba(255,255,255,.8)',
    white: '#ffffff',
  };

  // dashboard colors for charts
  var dashboardColors = {
    blueStone: '#1b70ef',
    surfieGreen: '#3c4eb9',
    silverTree: '#00abff',
    gossip: '#40daf1',
    transwhite: 'rgba(255,255,255,.3)',
    semiwhite: 'rgba(255,255,255,.8)',
    white: '#ffffff',
  };

  angular.module('BlurAdmin.theme')
    .provider('baConfig', configProvider);

  /** @ngInject */
  function configProvider(colorHelper) {
    var conf = {
      theme: {
        blur: true,
      },
      colors: {
        default: basic.default,
        defaultText: basic.defaultText,
        border: basic.border,
        borderDark: basic.borderDark,

        primary: colorScheme.primary,
        info: colorScheme.info,
        success: colorScheme.success,
        warning: colorScheme.warning,
        danger: colorScheme.danger,
		blueStone: colorScheme.blueStone,
		surfieGreen: colorScheme.surfieGreen,
		silverTree: colorScheme.silverTree,
		gossip: colorScheme.gossip,
		transwhite: colorScheme.transwhite,
		semiwhite: colorScheme.semiwhite,
		white: colorScheme.white,

        primaryLight: colorHelper.tint(colorScheme.primary, 30),
        infoLight: colorHelper.tint(colorScheme.info, 30),
        successLight: colorHelper.tint(colorScheme.success, 30),
        warningLight: colorHelper.tint(colorScheme.warning, 30),
        dangerLight: colorHelper.tint(colorScheme.danger, 30),

        primaryDark: colorHelper.shade(colorScheme.primary, 15),
        infoDark: colorHelper.shade(colorScheme.info, 15),
        successDark: colorHelper.shade(colorScheme.success, 15),
        warningDark: colorHelper.shade(colorScheme.warning, 15),
        dangerDark: colorHelper.shade(colorScheme.danger, 15),

        dashboard: {
          blueStone: dashboardColors.blueStone,
          surfieGreen: dashboardColors.surfieGreen,
          silverTree: dashboardColors.silverTree,
          gossip: dashboardColors.gossip,
          transwhite: dashboardColors.transwhite,
          semiwhite: dashboardColors.semiwhite,
          white: dashboardColors.white,
        },
      }
    };

    conf.changeTheme = function(theme) {
      angular.merge(conf.theme, theme)
    };

    conf.changeColors = function(colors) {
      angular.merge(conf.colors, colors)
    };

    conf.$get = function () {
      delete conf.$get;
      return conf;
    };
    return conf;
  }
})();
