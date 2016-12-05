(function () {
    angular.module('hcare').component('invoices', {
        templateUrl: 'main/components/insurance-billing/invoices/invoices.html',
        controller: InvoicesController
    });

    var Service = models.Service;
    InvoicesController.$inject = ['$uibModal', 'DataService', 'toaster'];
    //
    function InvoicesController($uibModal, DataService, toaster) {
        var ctrl = this;
        ctrl.carriers = [];
        ctrl.currentCarrier;
        ctrl.DataService = DataService;
        ctrl.toaster = toaster;
        
        ctrl.selected = false;
        ctrl.getData = getData;

        ctrl.$onInit = function () {
            ctrl.getData();
        };

        function getData() {
           DataService.getInsuranceCarriers()
               .then(function (response) {
            	   ctrl.carriers = response.data.payload
               })
               .catch(function (error) {
                   console.log('There was an error');
                   console.log(error);
                   toaster.pop('error', error.data)
               })
        }

        //Private methods
        function displayError(message) {
            var msg = 'There was an error!';
            if (message) {msg += '\n Message: ' + message}
            toaster.error(msg)
        }
    }

})();