(function () {
    angular.module('hcare').component('carrierList', {
        templateUrl: 'main/components/insurance-billing/carriers/carrier-list.html',
        controller: CarrierListController
    });

    var Carrier = models.Carrier;
    CarrierListController.$inject = ['$uibModal', 'DataService', 'toaster'];

    function CarrierListController($uibModal, DataService, toaster) {
        var ctrl = this;

        /**
         * Model
         */
        ctrl.carriers = [];
        ctrl.currentCarrier = new Carrier();
        ctrl.DataService = DataService;
        ctrl.toaster = toaster;

        ctrl.openAddCarrierModal = openAddCarrierModal;
        ctrl.getData = getData;

        /**
         * To manage the tab selection
         */
        ctrl.selected = false;


        ctrl.$onInit = getData;

        function getData() {
            DataService.getInsuranceCarriers()
                .then(function (response) {
                    if (response.status == '200') {
                    	ctrl.carriers = [];
                    	for(var i = 0; i < response.data.payload.length; i++){
                    		DataService.getCarrierById(response.data.payload[i].InsuranceCarrierId)
            	        	.then(function (response) {
                                if (response.status == '200') {
                                    ctrl.carriers.push(response.data.payload[0]);
                                } else {
                                    displayError()
                                }
                            })
                            .catch(function (error) {
                                displayError()
                            })
                    	}
                    } else {
                        displayError()
                    }
                })
                .catch(function (error) {
                    displayError()
                })
        }

        function openAddCarrierModal(resolve) {
            console.log(resolve);
            var addCarrierModalInstance = $uibModal.open({
                templateUrl: 'main/components/insurance-billing/carriers/add-carrier-modal.html',
                controller: 'addCarrierModalController',
                controllerAs: '$ctrl',
                resolve: {
                    carrier: function () {
                        return resolve;
                    }
                }
            });

            addCarrierModalInstance.result.then(function (carrier, editing) {
                ctrl.getData();
                var message = "You successfully ";
                message += editing ? 'edited' : 'added';
                message += ' a carrier';
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