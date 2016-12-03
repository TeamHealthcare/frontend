angular.module('hcare',
    [       'ui.bootstrap',
        'ui.router',
        'ngCookies',
        'toaster',
        'ngAnimate',
        'ngMessages'
        //'ngMockE2E'
    ]) //mock backend

    .run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
        }
    ])

angular.element(document).ready(function () {
    angular.bootstrap(document, ['hcare']);
});