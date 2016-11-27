(function () {

    angular.module('hcare')
        .service('DataService', DataService);

    DataService.$inject = ['URLS','$http'];
    function DataService(URLS, $http) {

        /**
         * Public API
         */
        this.getDataPromise = getDataPromise;
        this.getPatientRecords = getPatientRecords;
        this.getMedicalEncounters = getMedicalEncounters;
        this.getInsuranceCarriers = getInsuranceCarriers;
        this.getLabOrders = getLabOrders;
        this.addPatient = addPatient;
        this.addEncounter = addEncounter;
        /**/



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
         * Get Lab Orders
         *
         * @param config optional Angular $http config object
         * @returns {Promise} a $q promise object containing an array of records
         */
        function getLabOrders(config) {
            return $http.get(URLS.base + URLS.labOrders)
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

        /**
         * Get Medical Encounters
         *
         * @param config optional Angular $http config object
         * @returns {Promise} a $q promise object containing an array of medical encounters
         */
        function getMedicalEncounters(config) {
            return $http.get(URLS.base + URLS.encounters)
        }

        /**
         * Add Medical Encounter
         *
         * @param encounter encounter to add as an object
         * @param config optional Angular $http config object
         * @returns {Promise} a $q promise object containing an array of records
         */
        function addEncounter(encounter, config) {
            console.log('adding encounter');
            console.log('url: ' + URLS.base + URLS.addEncounter);
            console.log('The encounter is');
            console.log(encounter);

            return $http.post(URLS.base + URLS.addEncounter, encounter)
        }

    }

})();