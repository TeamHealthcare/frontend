(function () {
    angular.module('hcare').component('medicalEncounters', {
        templateUrl: 'main/components/electronic-patient-record/medical-encounters/medical-encounters.html',
        controller: MedicalEncountersController
    });

    var MedicalEncounter = models.MedicalEncounter;
    MedicalEncountersController.$inject = ['$uibModal', 'DataService', 'toaster'];
    //
    function MedicalEncountersController($uibModal, DataService, toaster) {
        var ctrl = this;
        ctrl.medicalEncounters = [];
        ctrl.currentmedicalEncounter = new MedicalEncounter();
        ctrl.openAddMedicalEncounterModal = openAddMedicalEncounterModal;
        ctrl.selected = false;

        ctrl.$onInit = getData;

        //TODO: Get medical encounters when ready in backend
        function getData() {
           DataService.getMedicalEncounters()
               .then(function (response) {
                   console.log(response);
                   ctrl.medicalEncounters = response.data.payload;
               })
               .catch(function (error) {
                   console.log('There was an error');
                   console.log(error);
                   // toaster.pop('error', error.data)
               })
        }

        function openAddMedicalEncounterModal(resolve) {
            console.log('opening modal and passing in resolve');
            console.log(resolve);
            var addMedicalEncounterModalInstance = $uibModal.open({
                templateUrl: 'main/components/electronic-patient-record/medical-encounters/add-medical-encounter-modal.html',
                controller: 'addMedicalEncounterModalController',
                controllerAs: '$ctrl',
                resolve: {
                    encounter: function () {
                        return resolve;
                    }
                }

            });

            addMedicalEncounterModalInstance.result.then(function (encounter) {
                //TODO: Add patient to list of patients
                console.log(encounter);
                ctrl.medicalEncounters.push(encounter);
            }, function () {
                //modal dismissed
            });
        }
    }

})();