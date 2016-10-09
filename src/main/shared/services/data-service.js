(function () {

    angular.module('hcare')
        .service('DataService', DataService);

    DataService.$inject = ['URLS','$http', '$q'];
    function DataService(URLS, $http, $q) {

        this.getDataPromise = getDataPromise;
        this.getPatientRecords = getPatientRecords;
        //Implementation
        /**
         * Generic http request with given options
         *
         * @param config Angular $http config object
         * @returns {Promise} a $q promise object
         */
        function getDataPromise(config) {
            return $http.get(URLS.base, config);
        }

        /**
         * Get Patient Records
         *
         * @param config optional Angular $http config object
         * @returns {Promise} a $q promise object containing an array of records
         */
        function getPatientRecords(config) {
            return $http.get(URLS.patients)
        }

    }

})();