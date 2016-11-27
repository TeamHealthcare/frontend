(function() {

    angular.module('hcare')
        .controller('addMedicalEncounterModalController', addMedicalEncounterModalController);

    addMedicalEncounterModalController.$inject = ['$uibModalInstance', 'DataService'];
    function addMedicalEncounterModalController($uibModalInstance, DataService) {
        var ctrl = this;

        ctrl.patients = [];

        ctrl.getPatients = getPatients;
        ctrl.ok = ok;
        ctrl.cancel = cancel;

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
        ctrl.Encounter = {
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
            console.log('ok pressed');
            console.log(ctrl.encounter);
            var encounterToAdd = angular.copy(ctrl.Encounter);
            encounterToAdd.EncounterDate = encounterToAdd.EncounterDate.toISOString();
            DataService.addEncounter(encounterToAdd)
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
