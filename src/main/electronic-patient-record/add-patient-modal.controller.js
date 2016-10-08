(function() {

    angular.module('hcare')
        .controller('addPatientModalController', addPatientModalController);

    addPatientModalController.$inject = ['$uibModalInstance'];
    function addPatientModalController($uibModalInstance) {

            var ctrl = this;
            this.ok = ok;
            this.cancel = cancel;

            function ok() {
                console.log('ok pressed');
                $uibModalInstance.close();
            }

            function cancel() {
                console.log('cancel pressed');
                $uibModalInstance.dismiss('cancel');
            }
    }

})();
