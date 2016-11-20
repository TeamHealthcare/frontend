(function () {
    angular.module('hcare').component('electronicPatientRecord', {
        templateUrl: 'main/components/electronic-patient-record/electronic-patient-record.html',
        controller: PatientRecordsController
    });

    PatientRecordsController.$inject = ['DataService'];
    function PatientRecordsController(DataService) {
        var ctrl = this;

    }
})();