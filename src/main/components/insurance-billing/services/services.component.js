(function () {
    angular.module('hcare').component('services', {
        templateUrl: 'main/components/insurance-billing/services/services.html',
        controller: ServicesController
    });

    var Service = models.Service;
    ServicesController.$inject = ['$uibModal', 'DataService', 'toaster'];
    //
    function ServicesController($uibModal, DataService, toaster) {
        var ctrl = this;
        ctrl.services = [];
        ctrl.currentService = new Service();
        ctrl.DataService = DataService;
        ctrl.toaster = toaster;
        
        ctrl.openAddServiceModal = openAddServiceModal;
        ctrl.selected = false;
        ctrl.getData = getData;

        ctrl.$onInit = function () {
            ctrl.getData();
        };

        function getData() {
           DataService.getServices()
               .then(function (response) {
            	   ctrl.services = [];
            	   for(var i = 0; i < response.data.payload.length; i++){
            		   for(var loop = 0; loop < ctrl.services.length; loop++){
            			   if(ctrl.services[loop].Description === response.data.payload[i].Description){
            				   break;
            			   }
            		   }
            		   if(loop === ctrl.services.length){
            			   ctrl.services.push(response.data.payload[i]);
            		   }
            	   }
               })
               .catch(function (error) {
                   console.log('There was an error');
                   console.log(error);
                   toaster.pop('error', error.data)
               })
        }

        function openAddServiceModal(resolve) {
            console.log(resolve);
            var addServiceModalInstance = $uibModal.open({
                templateUrl: 'main/components/insurance-billing/services/add-service-modal.html',
                controller: 'addServiceModalController',
                controllerAs: '$ctrl',
                resolve: {
                    service: function () {
                        return resolve;
                    }
                }
            });

            addServiceModalInstance.result.then(function (service, editing) {
                ctrl.getData();
                var message = "You successfully ";
                message += editing ? 'edited' : 'added';
                message += ' a service';
                ctrl.toaster.success(message)
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