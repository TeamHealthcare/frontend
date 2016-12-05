(function () {
    angular.module('hcare').component('invoiceDetail', {
        templateUrl: 'main/components/insurance-billing/invoices/invoice-detail/invoice-detail.html',
        bindings: {
            carrier: '<',
            onEdit: '&'
        },
        controller: InvoiceDetailController
    });

    var Service = models.Service;
    InvoiceDetailController.$inject = ['DataService'];
    function InvoiceDetailController(DataService) {
        var ctrl = this;

        ctrl.carrier;
        ctrl.edit = edit;
        
        ctrl.totalCost;
        ctrl.services = [];

        ctrl.onClick = onClick;
        
        ctrl.$onChanges = getserviceInfo;

        function onClick(){
        	
        }
        
        function edit() {
            toaster.pop('error',"Printing currently unsupported.");
        }

        function getserviceInfo(status) {
            "use strict";
            
            DataService.getServicesById(status.carrier.currentValue.InsuranceCarrierId)
            .then(function (response) {
        	   ctrl.services = response.data.payload;
        	   ctrl.totalCost = 0;
        	   for(var i = 0; i < ctrl.services.length; i++){
        		   ctrl.totalCost += parseInt(ctrl.services[i].Cost);
        	   }
             })
             .catch(function (error) {
               console.log('There was an error');
               console.log(error);
               toaster.pop('error', error.data)
             })
        }
    }

})();