angular.module('hcare',
    [       'ui.bootstrap',
            'ui.router',
            'ngCookies',
            'ngMockE2E'
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
    
    .run(['URLS','$httpBackend',function (URLS, $httpBackend) {
        var patients = [
            {
                id: 1,
                name: 'Robert Appleseed',
                phone: '619-111-2222',
                address: '123 main st, San Diego, CA 92111',
                insuranceCarrierId: 1,
                dateOfBirth: new Date('12/23/12'),
                gender: 'M',
                physician: 'Tina Hayworth'
            },
            {
                id: 2,
                name: 'Thomas Grape',
                phone: '619-111-2142',
                address: '456 main st, San Diego, CA 92111',
                insuranceCarrierId: 1,
                dateOfBirth: new Date('12/23/01'),
                gender: 'M',
                physician: 'Tina Hayworth'
            }
        ];

        // returns the current list of phones
        $httpBackend.whenGET(URLS.patients).respond(patients);

        $httpBackend.whenGET(/.html/).passThrough();
    }]);

angular.element(document).ready(function () {
        angular.bootstrap(document, ['hcare']);
});