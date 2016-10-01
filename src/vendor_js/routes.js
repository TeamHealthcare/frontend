'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('hcare').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/signin');

        //Main Layout
        $stateProvider
            .state('main', {
                abstract: true,
                templateUrl: 'templates/layout.html',
                controller: 'MasterController'
                // resolve: {
                //     savedState: function(State) {
                //         return State.updateLocalStorageLayout();
                //     }
                // }
                //controller: 'esubCtrl as global',
            })

        //        Sign in
            .state('main.signin', {
                url: '/signin',
                template: '<sign-in></sign-in>'
            })

        // Application routes
        //     .state('index', {
        //         url: '/',
        //         templateUrl: 'templates/dashboard.html'
        //     })
        //     .state('tables', {
        //         url: '/tables',
        //         templateUrl: 'templates/tables.html'
        //     });
    }
]);