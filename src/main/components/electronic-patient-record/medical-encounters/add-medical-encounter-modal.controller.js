(function() {

    angular.module('hcare')
        .controller('addMedicalEncounterModalController', addMedicalEncounterModalController);

    addMedicalEncounterModalController.$inject = ['$uibModalInstance', 'DataService', 'encounter'];
    function addMedicalEncounterModalController($uibModalInstance, DataService, encounter) {
        var ctrl = this;

        ctrl.editing = false;
        ctrl.patients = [];
        ctrl.labOrders = [];
        ctrl.getPatients = getPatients;
        ctrl.ok = ok;
        ctrl.cancel = cancel;

        /**
         * Check if we have an encounter, that means we will be editing a current medical encounter
         * instead of creating a new one. If that is the case, we need to do a couple of things.
         * 1. Convert the date string into a Date object
         * 2. The medical encounter lab order will be  a string. We convert it into a number.
         */
        if (encounter) {
            ctrl.editing = true;
            //1
            var date = angular.copy(encounter.EncounterDate);
            encounter.EncounterDate = new Date(date);
        }

        /**
         * Get data for modal
         */
        getData();
        getPatients();
        getLabOrders();

        /**
         * Dummy Data
         * @type {{EncounterDate: Date, Practitioner: number, Complaint: string, VitalSigns: string, Notes: string, LabOrderId: number, PharmacyOrder: string, Diagnosis: string, TreatmentPlan: string, Referral: string, FollowUpNotes: string, PatientId: number}}
         */
        ctrl.Encounter = encounter || {
            EncounterDate: new Date('02/12/2016'),
            Practitioner: 3,
            Complaint: 'A lot of pain',
            VitalSigns: 'Not very good',
            Notes: 'Nothing',
            LabOrderId: 2,
            PharmacyOrder: 'A lot of medicine',
            Diagnosis: 'Needs a lot of help',
            TreatmentPlan: 'Rest and medicine',
            Referral: 'None',
            FollowUpNotes: 'Come back in two months',
            PatientId: 1
        };

        /**
         * Get Data
         */
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
                    'Back from adding an encounter';
                    console.log(response);
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
