(function() {

    angular.module('hcare')
        .controller('addPatientModalController', addPatientModalController);

    addPatientModalController.$inject = ['$uibModalInstance', 'DataService'];
    function addPatientModalController($uibModalInstance, DataService) {

            var ctrl = this;
            ctrl.ok = ok;
            ctrl.cancel = cancel;
            ctrl.patient = {};

            function ok() {
                console.log('ok pressed');
                //TODO: Save new patient, then close()
                console.log(ctrl.patient);
                DataService.addPatient(patient)
                $uibModalInstance.close(ctrl.patient);
            }

            function cancel() {
                console.log('cancel pressed');
                $uibModalInstance.dismiss('cancel');
            }
    }

})();
