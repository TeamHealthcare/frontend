(function() {

    angular.module('hcare')
        .controller('addServiceModalController', addServiceModalController);

    addServiceModalController.$inject = ['$uibModalInstance', 'DataService', 'service', 'DateService'];
    function addServiceModalController($uibModalInstance, DataService, service, DateService) {
        var ctrl = this;

        ctrl.editing = false;
        ctrl.service = getService;
        ctrl.ok = ok;
        ctrl.cancel = cancel;
        ctrl.DateService = DateService;

        /**
         * Get data for modal
         */
        getData();
        getService();

        if (service) { ctrl.editing = true }
        ctrl.service = service || {};


        /**
         * Implementation
         */
//-------------------------------------------------------------------------------//
        function getData() {
            getService();
        }

        function getService() {
        	if(!ctrl.service || !ctrl.service.ServiceId){
        		return;
        	}
            DataService.getService(ctrl.service.ServiceId)
                .then(function(response) {
                    console.log(response);
                    if (response.data && response.data.payload) {
                        ctrl.service = response.data.payload[0];
                    } else {
                        console.log('There was an issue receiving the service');
                    }
                })
        }

        /**
         * API Implementation
         */
        function ok() {
            var serviceToAdd = angular.copy(ctrl.service);
            DataService.addService(serviceToAdd, ctrl.editing)
                .then(function (response) {
                })
                .catch(function (error) {
                    console.log('There was an error adding');
                    console.log(error);
                })
            $uibModalInstance.close(ctrl.service);
        }

        function cancel() {
            console.log('cancel pressed');
            $uibModalInstance.dismiss('cancel');
        }
    }

})();
