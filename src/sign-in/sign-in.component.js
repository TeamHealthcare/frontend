(function () {
    angular.module('hcare').component('signInComponent', SignInComponent);

    function SignInComponent() {

        var username;
        var password;

        function signin() {
            console.log('Clicked Sign In!');
        }
    }
});