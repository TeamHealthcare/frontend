(function () {

    angular.module('hcare')
        .service('DateService', DateService);

    DateService.$inject = [];
    function DateService() {

        /**
         * Public API
         */
        this.today = today;
        /**/



        /**
         * Implementation
         */

        /**
         * Get today date
         *
         * @returns today date
         */
        function today() {
            return new Date();
        }

    }

})();