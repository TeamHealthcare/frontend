(function() {

    angular.module('hcare')
        .controller('addPatientModalController', addPatientModalController);

    addPatientModalController.$inject = ['$uibModalInstance', 'DataService', 'patient'];
    function addPatientModalController($uibModalInstance, DataService, patient) {
        var ctrl = this;

        ctrl.editing = false;
        ctrl.patient;
        ctrl.insuranceCarriers = [];
        ctrl.getInsuranceCarriers = getInsuranceCarriers;
        ctrl.ok = ok;
        ctrl.cancel = cancel;

        /**
         * Get data for modal
         */
        getInsuranceCarriers();

        /**
         * Check if we have a patient, that means we will be editing a current patient
         * instead of creating a new one. If that is the case, we need to do a couple of things.
         * 1. Convert the date of birth string into a Date object
         */
        if (patient) {
            ctrl.editing = true;
            //1
            var date = angular.copy(patient.DateOfBirth);
            patient.DateOfBirth = new Date(date);
            ctrl.editing = true;
        }


        ctrl.patient = patient || {
            PatientName: 'Robert Smith',
            Address: '123 Main st',
            DateOfBirth: new Date('02-23-2012'),
            Gender: 'male',
            InsuranceCarrierId: 225,
            PhoneNumber: '6194444444',
            City: 'San Diego',
            State: 'CA',
            ZipCode: '92101',
            Physician: 'Applesauce'
        };


        /**
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
            $uibModalInstance.close(ctrl.patient);
        }

        function cancel() {
            console.log('cancel pressed');
            $uibModalInstance.dismiss('cancel');
        }
    }

})();
