(function() {

    angular.module('hcare')
        .controller('addPatientModalController', addPatientModalController);

    addPatientModalController.$inject = ['$uibModalInstance', 'DataService'];
    function addPatientModalController($uibModalInstance, DataService) {

            var ctrl = this;
            ctrl.ok = ok;
            ctrl.cancel = cancel;
            ctrl.patient = {
                PatientName: 'Robert Smith',
                Address: '123 Main st',
                DateOfBirth: new Date('02-23-2012'),
                Gender: 'Male',
                InsuranceCarrierId: '1',
                Physician: 'Applesauce'
            };

        /**
         * Submit the information for adding a patient. After closing, if it is successful, the
         * patient object is returned to the calling component to display. We can either append it
         * directly to the patient list or reload the updated list from the server.
         */
        function ok() {
                console.log('ok pressed');
                //TODO: Save new patient, then close()
                console.log(ctrl.patient);
            console.log(DataService);
                DataService.addPatient(ctrl.patient);
                $uibModalInstance.close(ctrl.patient);
            }

            function cancel() {
                console.log('cancel pressed');
                $uibModalInstance.dismiss('cancel');
            }
    }

})();
