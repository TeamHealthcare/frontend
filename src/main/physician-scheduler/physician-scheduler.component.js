(function () {
    angular.module('hcare').component('physicianScheduler', {
        templateUrl: 'main/physician-scheduler/physician-scheduler.html',
        controller: PhysicianSchedulerController
    });

    PhysicianSchedulerController.$inject = [];
    function PhysicianSchedulerController() {
        var ctrl = this;


    }
})();