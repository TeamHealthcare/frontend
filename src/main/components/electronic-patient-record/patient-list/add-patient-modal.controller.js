(function() {

    angular.module('hcare')
        .controller('addPatientModalController', addPatientModalController);

    addPatientModalController.$inject = ['$uibModalInstance', 'DataService'];
    function addPatientModalController($uibModalInstance, DataService) {

        var ctrl = this;
        ctrl.patient = {};
        ctrl.insuranceCarriers = {};
        ctrl.getInsuranceCarriers = getInsuranceCarriers;
        ctrl.ok = ok;
        ctrl.cancel = cancel;

        /**
         * Get data for modal
         */
        getInsuranceCarriers();

        ctrl.patient = {
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
            console.log('ok pressed');
            //TODO: Save new patient, then close()
            console.log(ctrl.patient);
            var patientToAdd = angular.copy(ctrl.patient);
            patientToAdd.DateOfBirth = patientToAdd.DateOfBirth.toISOString();
            DataService.addPatient(patientToAdd)
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
