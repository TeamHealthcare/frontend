(function () {
    angular.module('hcare').component('medicalEncounters', {
        templateUrl: 'main/components/electronic-patient-record/medical-encounters/medical-encounters.html',
        controller: MedicalEncountersController
    });

    var MedicalEncounter = models.MedicalEncounter;
    MedicalEncountersController.$inject = ['$uibModal', 'DataService'];
    //
    function MedicalEncountersController($uibModal, DataService) {
        var ctrl = this;
        ctrl.medicalEncounters = [];
        ctrl.currentmedicalEncounter = new MedicalEncounter();
        ctrl.openAddMedicalEncounterModal = openAddMedicalEncounterModal;
        ctrl.selected = false;

        ctrl.$onInit = getData;

        //TODO: Get medical encounters when ready in backend
        function getData() {
        //    DataService.getMedicalEncounters()
        //        .then(function (response) {
        //            console.log(response);
        //            ctrl.medicalEncounters = response.data.payload;
        //        })
        }

        function openAddMedicalEncounterModal() {
            var addMedicalEncounterModalInstance = $uibModal.open({
                templateUrl: 'main/components/electronic-patient-record/medical-encounters/add-medical-encounter-modal.html',
                controller: 'addMedicalEncounterModalController',
                controllerAs: '$ctrl'
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