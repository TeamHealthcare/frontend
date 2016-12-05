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
        
        this.addCarrier = addCarrier;
        this.getCarrierById = getCarrierById;
        this.getServices = getServices;
        this.addService = addService;
        this.getServicesById = getServicesById;
        /**/
        
        function getServices(url,config) {
        	return $http.get(URLS.base + URLS.services);
        }
        
        function getServicesById(config){
        	return $http.get(URLS.base + URLS.servicesByCarrier + "/" + config);
        }
        
        function addService(service, editing) {
        	if(editing){
        		var serviceConvert = {
            		insurancecarrierid: service.InsuranceCarrierId,
            		description: service.Description,
            		cost: service.Cost
            	}
        	} else {
        		var serviceConvert = {
            		insurancecarrierid: "3",
            		description: service.Description,
            		cost: parseInt(service.Cost)
            	}
        	}
        	
            var method = editing ? 'PUT': 'POST';
            var url = editing ? URLS.updateService + '/' + service.ServiceId : URLS.addService;
            return $http( {
                method: method,
                url: URLS.base + url,
                data: serviceConvert
            })
        }
        

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
         * @param editing if we are editing an existing patient
         * @returns {Promise} a $q promise object containing an array of records
         */
        function addPatient(patient, editing) {
            var method = editing ? 'PUT': 'POST';
            var url = editing ? URLS.editPatient + '/' + patient.PatientId : URLS.addPatient;
            return $http( {
                method: method,
                url: URLS.base + url,
                data: patient
            })
        }
        
        /**
         * Add Carrier
         *
         * @param carrier carrier to add as an object
         * @param editing if we are editing an existing carrier
         * @returns {Promise} a $q promise object containing an array of records
         */
        function addCarrier(carrier, editing) {
        	if(editing){
        		var carrierConvert = {
            		"carrier": carrier.Carrier,
            		"address": carrier.Address,
            		"active": carrier.Active
            	}
        	} else {
        		var carrierConvert = {
            		"carrier": carrier.Carrier,
            		"address": carrier.Address,
            		"active": parseInt(carrier.Active)
            	}
        	}
        	
            var method = editing ? 'PUT': 'POST';
            var url = editing ? URLS.editCarrier + '/' + carrier.InsuranceCarrierId : URLS.addCarrier;
            return $http( {
                method: method,
                url: URLS.base + url,
                data: carrierConvert
            })
        }
        
        /**
         * Get a single carrier information
         *
         * @param config optional Angular $http config object
         * @returns {Promise} a $q promise object containing a carrier
         */
        function getCarrierById(config) {
            return $http.get(URLS.base + URLS.getCarrier + config)
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