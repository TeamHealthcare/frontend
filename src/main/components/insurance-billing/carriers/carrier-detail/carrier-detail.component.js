(function () {
    angular.module('hcare').component('carrierDetail', {
        templateUrl: 'main/components/insurance-billing/carriers/carrier-detail/carrier-detail.html',
        bindings: {
            carrier: '<',
            onEdit: '&'
        },
        controller: CarrierDetailController
    });

    var Carrier = models.Carrier;
    CarrierDetailController.$inject = ['DataService'];
    function CarrierDetailController(DataService) {
        var ctrl = this;

        ctrl.carrier;
        ctrl.edit = edit;
        ctrl.status = {
            0: 'Pays on time',
            1: 'Late with payments',
            2: 'Difficult to get payment'
        };
        /**
        Component initialization
         */
        ctrl.$onInit = getCarrierInfo;

        function edit(carrier) {
            ctrl.onEdit({ carrier: ctrl.carrier });
        }

        function getCarrierInfo() {
        }
    }

})();
