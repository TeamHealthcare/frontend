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
         * @Param editing if we are editing an existing patient
         * @param config optional Angular $http config object
         * @returns {Promise} a $q promise object containing an array of records
         */
        function addPatient(patient, editing, config) {
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
         * @param editing if we are editing an existing encounter
         * @param config optional Angular $http config object
         * @returns {Promise} a $q promise object containing an array of records
         */
        function addEncounter(encounter, editing) {
            var method = editing ? 'PUT': 'POST';
            var url = editing ? URLS.editEncounter + '/' + encounter.MedicalEncounterId : URLS.addEncounter;
            return $http( {
                method: method,
                url: URLS.base + url,
                data: encounter
            })
        }

    }

})();