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
            .state('signin', {
                url: '/signin',
                template: '<sign-in></sign-in>'
            })

        // Application routes
            .state('main.records', {
                url: '/records',
                template: '<electronic-patient-record></electronic-patient-record>'
            })
            .state('main.records.patientDetail', {
                url: '/records/patients/:patientId',
                template: '<patient-detail></patient-detail>'
            })
            .state('main.scheduler', {
                url: '/scheduler',
                template: '<physician-scheduler></physician-scheduler>'
            })
            .state('main.lab', {
                url: '/lab',
                template: '<lab-order-tracking></lab-order-tracking>'
            })
            .state('main.pharmacy', {
                url: '/pharmacy',
                template: '<pharmacy-order-tracking></pharmacy-order-tracking>'
            })
            .state('main.billing', {
                url: '/billing',
                template: '<insurance-billing></insurance-billing>'
            })
            .state('main.equipment', {
                url: '/equipment',
                template: '<equipment-inventory></equipment-inventory>'
            })
        //     .state('tables', {
        //         url: '/tables',
        //         templateUrl: 'templates/tables.html'
        //     });
    }
]);

// <li class="sidebar-list">
//     <a href="#/record">Patient Record <span class="menu-icon fa fa-tachometer"></span></a>
//     </li>
//     <li class="sidebar-list">
//     <a href="#/scheduler">Physician Scheduler <span class="menu-icon fa fa-table"></span></a>
//     </li>
//     <li class="sidebar-list">
//     <a href="#/lab-order-tracking">Lab<span class="menu-icon fa fa-table"></span></a>
//     </li>
//     <li class="sidebar-list">
//     <a href="#/pharmacy-order-tracking">Pharmacy<span class="menu-icon fa fa-table"></span></a>
//     </li>
//     <li class="sidebar-list">
//     <a href="#/billing">Billing <span class="menu-icon fa fa-table"></span></a>
//     </li>
//     <li class="sidebar-list">
//     <a href="#/inventory">Equipment <span class="menu-icon fa fa-table"></span></a>
//     </li>