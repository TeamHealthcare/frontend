(function () {
    angular.module('hcare').component('patientList', {
        templateUrl: 'main/components/electronic-patient-record/patient-list/patient-list.html',
        controller: PatientListController
    });

    var Patient = models.Patient;
    PatientListController.$inject = ['$uibModal', 'DataService'];

    function PatientListController($uibModal, DataService) {
        var ctrl = this;
        ctrl.patients = [];
        ctrl.currentPatient = new Patient();
        ctrl.openAddPatientModal = openAddPatientModal;
        ctrl.selected = false;

        ctrl.$onInit = getData;

        function getData() {
            DataService.getPatientRecords()
                .then(function (response) {
                    console.log(response);
                    ctrl.patients = response.data;
                })
        }

        function openAddPatientModal() {
            var addPatientModalInstance = $uibModal.open({
                templateUrl: 'main/components/electronic-patient-record/patient-list/add-patient-modal.html',
                controller: 'addPatientModalController',
                controllerAs: '$ctrl'
            });

            addPatientModalInstance.result.then(function (patient) {
                //TODO: Add patient to list of patients
                console.log(patient);
                ctrl.patients.push(patient);
            }, function () {
                //modal dismissed
            });
        }
    }

})();