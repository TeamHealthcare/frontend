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
        this.getInsuranceCarriers = getInsuranceCarriers;
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
        function getDataPromise(url,config) {
            return $http.get(url, config);
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
         * Get Insurance Carriers
         *
         * @param config optional Angular $http config object
         * @returns {Promise} a $q promise object containing an array of records
         */
        function getInsuranceCarriers(config) {
            return $http.get(URLS.base + URLS.insuranceCarriers)
        }

        /**
         * Add Patient
         *
         * @param patient patient to add as an object
         * @param config optional Angular $http config object
         * @returns {Promise} a $q promise object containing an array of records
         */
        function addPatient(patient, config) {
            console.log('adding patient');
            console.log('url: ' + URLS.base + URLS.addPatient);
            console.log('The patient is');
            console.log(patient);

            return $http.post(URLS.base + URLS.addPatient, patient)
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