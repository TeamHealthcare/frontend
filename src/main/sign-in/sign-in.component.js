(function () {
    angular.module('hcare').component('signIn', {
        templateUrl: 'main/sign-in/sign-in.html',
        controller: SignInController
    });

    SignInController.$inject = ['$state'];
    function SignInController($state) {
        var ctrl = this;

        var username = '';
        var password = '';

        ctrl.signin = function () {
            console.log('Clicked Sign In!');
            $state.go('main.records')
        }
    }
})();