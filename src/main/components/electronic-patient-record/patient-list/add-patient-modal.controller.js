(function() {

    angular.module('hcare')
        .controller('addPatientModalController', addPatientModalController);

    addPatientModalController.$inject = ['$uibModalInstance', 'DataService', 'patient', 'DateService'];
    function addPatientModalController($uibModalInstance, DataService, patient, DateService) {
        var ctrl = this;

        /**
         * Public API
         *
         */
        ctrl.editing = false;
        ctrl.patient;
        ctrl.insuranceCarriers = [];
        ctrl.getInsuranceCarriers = getInsuranceCarriers;
        ctrl.ok = ok;
        ctrl.cancel = cancel;
        ctrl.DateService = DateService;

        /**
         * Get data for modal and set patient if we are editing
         */
        getInsuranceCarriers();
        if (patient) { ctrl.editing = true }
        ctrl.patient = patient || {};


        /**
         * Implementation
         */
//-------------------------------------------------------------------------------//
        /**
         * Get Insurance Carriers to set the select options properly
         *
         */
        function getInsuranceCarriers() {
            DataService.getInsuranceCarriers()
                .then(function(response) {
                    console.log(response);
                    if (response.data && response.data.payload) {
                        ctrl.insuranceCarriers = response.data.payload;
                    } else {
                        console.log('There was an issue receiving the insurance carriers');
                    }
            })
        }

        /**
         * Submit the information for adding a patient. After closing, if it is successful, the
         * patient object is returned to the calling component to display. We can either append it
         * directly to the patient list or reload the updated list from the server.
         */
        function ok() {
            var patientToAdd = angular.copy(ctrl.patient);
            patientToAdd.DateOfBirth = patientToAdd.DateOfBirth.toISOString();
            DataService.addPatient(patientToAdd, ctrl.editing)
                .then(function (response) {
                    'Back from adding a patient';
                    console.log(response);

                })
                .catch(function (error) {
                    console.log('There was an error adding');
                    console.log(error);
                })
            //We want to communicate whether we edited a current patient or added a new one so we can respond appropriately.
            if (ctrl.editing) {
                $uibModalInstance.close(ctrl.patient, true);
            } else {
                $uibModalInstance.close(ctrl.patient, false);
            }
        }

        function cancel() {
            console.log('cancel pressed');
            $uibModalInstance.dismiss('cancel');
        }
    }

})();
