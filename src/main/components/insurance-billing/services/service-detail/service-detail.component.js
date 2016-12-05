(function () {
    angular.module('hcare').component('serviceDetail', {
        templateUrl: 'main/components/insurance-billing/services/service-detail/service-detail.html',
        bindings: {
            service: '<',
            onEdit: '&'
        },
        controller: ServiceDetailController
    });

    var Service = models.Service;
    ServiceDetailController.$inject = [];
    function ServiceDetailController() {
        var ctrl = this;

        ctrl.service;
        ctrl.edit = edit;

        ctrl.$onInit = getserviceInfo;


        function edit(service) {
            ctrl.onEdit({ service: ctrl.service });
        }

        function getserviceInfo() {
            "use strict";

        }
    }

})();