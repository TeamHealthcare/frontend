(function () {
    angular.module('hcare').component('medicalEncounterDetail', {
        templateUrl: 'main/components/electronic-patient-record/medical-encounters/medical-encounter-detail/medical-encounter-detail.html',
        bindings: {
            encounter: '<'
        },
        controller: MedicalEncounterDetailController
    });

    var MedicalEncounter = models.MedicalEncounter;
    MedicalEncounterDetailController.$inject = [];
    function MedicalEncounterDetailController() {
        var ctrl = this;
        ctrl.encounter = new MedicalEncounter();

        ctrl.$onInit = getmedicalEncounterInfo;

        function getmedicalEncounterInfo() {
        }
    }

})();