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
