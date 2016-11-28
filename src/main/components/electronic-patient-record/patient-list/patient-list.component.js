(function () {
    angular.module('hcare').component('patientList', {
        templateUrl: 'main/components/electronic-patient-record/patient-list/patient-list.html',
        controller: PatientListController
    });

    var Patient = models.Patient;
    PatientListController.$inject = ['$uibModal', 'DataService', 'toaster'];

    function PatientListController($uibModal, DataService, toaster) {
        var ctrl = this;

        /**
         * Model
         */
        ctrl.patients = [];
        ctrl.currentPatient = new Patient();

        ctrl.openAddPatientModal = openAddPatientModal;
        ctrl.getData = getData;

        /**
         * To manage the tab selection
         */
        ctrl.selected = false;


        ctrl.$onInit = getData;

        function getData() {
            DataService.getPatientRecords()
                .then(function (response) {
                    if (response.status == '200') {
                        ctrl.patients = response.data.payload;
                    } else {
                        displayError()
                    }
                })
                .catch(function (error) {
                    displayError()
                })
        }

        function openAddPatientModal(resolve) {
            console.log(resolve);
            var addPatientModalInstance = $uibModal.open({
                templateUrl: 'main/components/electronic-patient-record/patient-list/add-patient-modal.html',
                controller: 'addPatientModalController',
                controllerAs: '$ctrl',
                resolve: {
                    patient: function () {
                        return resolve;
                    }
                }
            });

            addPatientModalInstance.result.then(function (patient) {
                ctrl.getData();
            }, function () {
                //modal dismissed
            });
        }


        //Private methods
        function displayError(message) {
            var msg = 'There was an error!';
            if (message) {msg += '\n Message: ' + message}
            toaster.error(msg)
        }
    }

})();