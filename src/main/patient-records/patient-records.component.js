(function () {
    angular.module('hcare').component('patientRecords', {
        templateUrl: 'main/patient-records/patient-records.html',
        controller: PatientRecordsController
    });

    PatientRecordsController.$inject = ['$http','DataService'];
    function PatientRecordsController($http, DataService) {
        var ctrl = this;

        this.patients = [];

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

        }


    }
})();