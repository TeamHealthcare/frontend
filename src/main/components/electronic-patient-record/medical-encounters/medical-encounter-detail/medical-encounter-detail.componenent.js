(function () {
    angular.module('hcare').component('medicalEncounterDetail', {
        templateUrl: 'main/components/electronic-patient-record/medical-encounters/medical-encounter-detail/medical-encounter-detail.html',
        bindings: {
            encounter: '<',
            onEdit: '&'
        },
        controller: MedicalEncounterDetailController
    });

    var MedicalEncounter = models.MedicalEncounter;
    MedicalEncounterDetailController.$inject = [];
    function MedicalEncounterDetailController() {
        var ctrl = this;

        ctrl.encounter;
        ctrl.edit = edit;

        ctrl.$onInit = getmedicalEncounterInfo;


        function edit(encounter) {
            ctrl.onEdit({ encounter: ctrl.encounter });
        }

        function getmedicalEncounterInfo() {
            "use strict";

        }
    }

})();