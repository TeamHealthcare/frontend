(function() {

    angular.module('hcare')
        .controller('addMedicalEncounterModalController', addMedicalEncounterModalController);

    addMedicalEncounterModalController.$inject = ['$uibModalInstance', 'DataService', 'encounter', 'DateService'];
    function addMedicalEncounterModalController($uibModalInstance, DataService, encounter, DateService) {
        var ctrl = this;

        ctrl.editing = false;
        ctrl.patients = [];
        ctrl.labOrders = [];
        ctrl.getPatients = getPatients;
        ctrl.ok = ok;
        ctrl.cancel = cancel;
        ctrl.DateService = DateService;

        /**
         * Get data for modal
         */
        getData();
        getPatients();
        getLabOrders();

        if (encounter) { ctrl.editing = true }
        ctrl.Encounter = encounter || {};


        /**
         * Implementation
         */
//-------------------------------------------------------------------------------//
        function getData() {
            getPatients();
            getLabOrders();
        }

        function getPatients() {
            DataService.getPatientRecords()
                .then(function(response) {
                    console.log(response);
                    if (response.data && response.data.payload) {
                        ctrl.patients = response.data.payload;
                    } else {
                        console.log('There was an issue receiving the insurance carriers');
                    }
                })
        }

        //TODO: Rewrite when ready from the server. For now we hardcode it
        function getLabOrders() {
            ctrl.labOrders = [
                {
                    LabOrderId: 2,
                    PatientId: 1,
                    EmployeeId: 1,
                    LabTestTypeId: 1,
                    LabTestDate: '2016-11-27 09:14:45',
                    LabTechnicianId: 5,
                    LabTestResults: '1'
                }
            ];
            // DataService.getLabOrders()
            //     .then(function(response) {
            //         console.log(response);
            //         if (response.data && response.data.payload) {
            //             ctrl.labOrders = response.data.payload;
                //     } else {
                //         console.log('There was an issue receiving the lab orders');
                //     }
                // })
        }


        /**
         * API Implementation
         */
        function ok() {
            var encounterToAdd = angular.copy(ctrl.Encounter);
            encounterToAdd.EncounterDate = encounterToAdd.EncounterDate.toISOString();
            DataService.addEncounter(encounterToAdd, ctrl.editing)
                .then(function (response) {
                })
                .catch(function (error) {
                    console.log('There was an error adding');
                    console.log(error);
                })
            $uibModalInstance.close(ctrl.encounter);
        }

        function cancel() {
            console.log('cancel pressed');
            $uibModalInstance.dismiss('cancel');
        }
    }

})();
