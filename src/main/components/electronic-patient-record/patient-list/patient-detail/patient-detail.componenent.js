(function () {
    angular.module('hcare').component('patientDetail', {
        templateUrl: 'main/components/electronic-patient-record/patient-list/patient-detail/patient-detail.html',
        bindings: {
            patient: '<'
        },
        controller: PatientDetailController
    });

    var Patient = models.Patient;
    PatientDetailController.$inject = [];
    function PatientDetailController() {
        var ctrl = this;
        ctrl.patient;

        ctrl.$onInit = getPatientInfo;

        function getPatientInfo() {
        }
    }

})();