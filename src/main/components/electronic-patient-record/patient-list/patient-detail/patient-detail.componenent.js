(function () {
    angular.module('hcare').component('patientDetail', {
        templateUrl: 'main/components/electronic-patient-record/patient-list/patient-detail/patient-detail.html',
        controller: PatientDetailController
    });

    PatientDetailController.$inject = ['$stateParams'];
    function PatientDetailController($stateParams) {
        var ctrl = this;
        ctrl.patient = new Patient();

        ctrl.$onInit = getPatientInfo;

        function getPatientInfo() {
            console.log('getting patient info');
            console.log($stateParams);
        }
    }

})();