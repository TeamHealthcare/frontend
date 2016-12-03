(function () {
    angular.module('hcare').component('patientDetail', {
        templateUrl: 'main/components/electronic-patient-record/patient-list/patient-detail/patient-detail.html',
        bindings: {
            patient: '<',
            onEdit: '&'
        },
        controller: PatientDetailController
    });

    var Patient = models.Patient;
    PatientDetailController.$inject = [];
    function PatientDetailController() {
        var ctrl = this;

        ctrl.patient;
        ctrl.edit = edit;
        /**
        Component initialization
         */
        ctrl.$onInit = getPatientInfo;

        function edit(patient) {
            ctrl.onEdit({ patient: ctrl.patient });
        }

        function getPatientInfo() {
        }
    }

})();