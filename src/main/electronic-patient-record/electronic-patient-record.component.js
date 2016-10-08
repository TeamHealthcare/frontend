(function () {
    angular.module('hcare').component('electronicPatientRecord', {
        templateUrl: 'main/electronic-patient-record/electronic-patient-record.html',
        controller: PatientRecordsController
    });

    PatientRecordsController.$inject = ['$http','DataService', '$uibModal'];
    function PatientRecordsController($http, DataService, $uibModal) {
        var ctrl = this;

        this.patients = [];

        this.openAddPatientModal = openAddPatientModal;

        this.$onInit = getData;

        function getData() {
            console.log($http);
            console.log(DataService);
            DataService.getPatientRecords()
                .then(function (response) {
                    console.log('got patient records');
                    ctrl.patients = response.data
                })
        }

    ///--------Patient List Component ------///////
        function openAddPatientModal() {
            var modalInstance = $uibModal.open({
                templateUrl: 'main/electronic-patient-record/add-patient-modal.html',
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