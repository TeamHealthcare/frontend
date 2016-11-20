angular.module('hcare',
    [       'ui.bootstrap',
        'ui.router',
        'ngCookies',
        'toaster',
        'ngAnimate'
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

    //.run(['URLS','$httpBackend',function (URLS, $httpBackend) {
    //    var patients = [
    //        {
    //            id: 1,
    //            name: 'Robert Appleseed',
    //            phone: '619-111-2222',
    //            address: '123 main st, San Diego, CA 92111',
    //            insuranceCarrierId: 1,
    //            dateOfBirth: '12/23/12',
    //            gender: 'M',
    //            physician: 'Tina Hayworth'
    //        },
    //        {
    //            id: 2,
    //            name: 'Thomas Grape',
    //            phone: '619-111-2142',
    //            address: '456 main st, San Diego, CA 92111',
    //            insuranceCarrierId: 1,
    //            dateOfBirth: '12/23/01',
    //            gender: 'M',
    //            physician: 'Tina Hayworth'
    //        }
    //    ];
    //
    //    // returns the current list of patients
    //    $httpBackend.whenGET(URLS.patients).respond(patients);
    //
    //    var encounters = [
    //        {
    //            id: 1,
    //            encounterDate: '02/10/2016',
    //            practitioner: 'Shelley Alle',
    //            complaint: 'none',
    //            vitalSigns: 'good',
    //            notes: 'None',
    //            labOrderId: 3,
    //            pharmacyOrder: 'tylenol',
    //            diagnosis: 'good',
    //            treatmentPlan: 'none',
    //            referral: 'dermatologist',
    //            followUpNotes: 'good stuff'
    //        },
    //        {
    //            id: 2,
    //            encounterDate: '05/12/2015',
    //            practitioner: 'Shelley Alle',
    //            complaint: 'a lot of them',
    //            vitalSigns: 'bad',
    //            notes: '',
    //            labOrderId: 4,
    //            pharmacyOrder: 'steroids',
    //            diagnosis: 'bad',
    //            treatmentPlan: 'a lot of rest and medicine',
    //            referral: '',
    //            followUpNotes: ''
    //        }
    //    ];
    //
    //    $httpBackend.whenGET(URLS.encounters).respond(encounters);
    //
    //
    //
    //
    //
    //
    //    $httpBackend.whenGET(/.html/).passThrough();
    //}]);

angular.element(document).ready(function () {
    angular.bootstrap(document, ['hcare']);
});