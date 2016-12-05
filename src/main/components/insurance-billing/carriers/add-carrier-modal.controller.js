(function() {

    angular.module('hcare')
        .controller('addCarrierModalController', addCarrierModalController);

    addCarrierModalController.$inject = ['$uibModalInstance', 'DataService', 'carrier', 'DateService'];
    function addCarrierModalController($uibModalInstance, DataService, carrier, DateService) {
        var ctrl = this;

        /**
         * Public API
         *
         */
        ctrl.editing = false;
        ctrl.carrier;
        if(carrier){
        	ctrl.carrier = carrier;
        }
        ctrl.activeStatuses = [0,1,2];

        ctrl.ok = ok;
        ctrl.cancel = cancel;

        /**
         * Get data for modal and set carrier if we are editing
         */
//        getInsuranceCarriers();
        if (carrier) { ctrl.editing = true }
        ctrl.carrier = carrier|| {};


        /**
         * Implementation
         */

        /**
         * Submit the information for adding a carrier. After closing, if it is successful, the
         * carrier object is returned to the calling component to display. We can either append it
         * directly to the carrier list or reload the updated list from the server.
         */
        function ok() {
            var carrierToAdd = angular.copy(ctrl.carrier);
            DataService.addCarrier(carrierToAdd, ctrl.editing)
                .then(function (response) {
                    'Back from adding a carrier';
                    console.log(response);

                })
                .catch(function (error) {
                    console.log('There was an error adding');
                    console.log(error);
                })
            //We want to communicate whether we edited a current carrier or added a new one so we can respond appropriately.
            if (ctrl.editing) {
                $uibModalInstance.close(ctrl.carrier, true);
            } else {
                $uibModalInstance.close(ctrl.carrier, false);
            }
        }

        function cancel() {
            console.log('cancel pressed');
            $uibModalInstance.dismiss('cancel');
        }
    }

})();