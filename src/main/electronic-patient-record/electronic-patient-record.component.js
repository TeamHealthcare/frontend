(function () {
    angular.module('hcare').component('electronicPatientRecord', {
        templateUrl: 'main/electronic-patient-record/electronic-patient-record.html',
        controller: PatientRecordsController
    });

    PatientRecordsController.$inject = [];
    function PatientRecordsController() {
        var ctrl = this;

    }
})();