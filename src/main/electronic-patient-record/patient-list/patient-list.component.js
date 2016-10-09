(function () {
    angular.module('hcare').component('patientList', {
        templateUrl: 'main/electronic-patient-record/patient-list/patient-list.html',
        controller: PatientListController
    });

    PatientListController.$inject = ['$uibModal', 'DataService']
    function PatientListController($uibModal, DataService) {
        var ctrl = this;
        ctrl.patients = [];

        ctrl.openAddPatientModal = openAddPatientModal;

        ctrl.$onInit = getData;

        function getData() {
            DataService.getPatientRecords()
                .then(function (response) {
                    console.log('got patient records');
                    ctrl.patients = response.data

                })
        }

        function openAddPatientModal() {
            var modalInstance = $uibModal.open({
                templateUrl: 'main/electronic-patient-record/patient-list/add-patient-modal.html',
                controller: 'addPatientModalController',
                controllerAs: '$ctrl'
            });

            modalInstance.result.then(function () {
                //Send patient to database
            }, function () {
                //modal dismissed
            });
        }
    }

})();