(function () {
    angular.module('hcare').component('insuranceBilling', {
        templateUrl: 'main/components/insurance-billing/insurance-billing.html',
        controller: InsuranceBillingController
    });

    InsuranceBillingController.$inject = ['DataService'];
    function InsuranceBillingController(DataService) {
        var ctrl = this;


    }
})();