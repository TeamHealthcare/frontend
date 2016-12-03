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
        ctrl.getData = getData;

        ctrl.$onInit = function () {
            ctrl.getData();
        };

        function getData() {
           DataService.getMedicalEncounters()
               .then(function (response) {
                   ctrl.medicalEncounters = response.data.payload.map(function (encounter) {
                       encounter.EncounterDate = new Date(encounter.EncounterDate);
                       return encounter
                   });
               })
               .catch(function (error) {
                   console.log('There was an error');
                   console.log(error);
                   toaster.pop('error', error.data)
               })
        }

        function openAddMedicalEncounterModal(resolve) {
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
                ctrl.getData();
            }, function () {
                //modal dismissed
            });
        }
    }

})();