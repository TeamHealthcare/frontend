(function() {

    angular.module('hcare')
        .controller('addMedicalEncounterModalController', addMedicalEncounterModalController);

    addMedicalEncounterModalController.$inject = ['$uibModalInstance', 'DataService'];
    function addMedicalEncounterModalController($uibModalInstance, DataService) {

            var ctrl = this;
            ctrl.ok = ok;
            ctrl.cancel = cancel;
            ctrl.encounter = {};

            function ok() {
                console.log('ok pressed');
                //TODO: Save new patient, then close()
                $uibModalInstance.close(ctrl.encounter);
            }

            function cancel() {
                console.log('cancel pressed');
                $uibModalInstance.dismiss('cancel');
            }
    }

})();
