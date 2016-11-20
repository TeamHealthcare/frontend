(function () {

    angular.module('hcare')
        .service('DataService', DataService);

    DataService.$inject = ['URLS','$http', '$q'];
    function DataService(URLS, $http, $q) {

        /**
         * Public API
         */
        this.getDataPromise = getDataPromise;
        this.getPatientRecords = getPatientRecords;
        this.getMedicalEncounters = getMedicalEncounters;
        this.addPatient = addPatient;


        /**
         * Implementation
         */

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
            return $http.get(URLS.base + URLS.patients)
        }

        /**
         * Add Patient
         *
         * @param patient patient to add as an object
         * @param config optional Angular $http config object
         * @returns {Promise} a $q promise object containing an array of records
         */
        function addPatient(patient, config) {
            return $http.post(URLS.base + URLS.addPatient, patient, config)
        }

        //TODO: Get medical encounters when ready in backend
        /**
         * Get Medical Encounters
         *
         * @param config optional Angular $http config object
         * @returns {Promise} a $q promise object containing an array of medical encounters
         */
        function getMedicalEncounters(config) {
            return $http.get(URLS.base + URLS.encounters)
        }

    }

})();