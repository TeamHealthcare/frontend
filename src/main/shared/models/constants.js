angular.module('hcare')
    .constant('URLS', {
        base: 'http://www.skoolrox.com/hc/v1',
        patients: '/patients',
        addPatient: '/addepatient',
        editPatient: '/updatepatient',
        encounters: '/getMedicalEncounters',
        addEncounter: '/addencounter',
        editEncounter: '/updateencounter',
        insuranceCarriers: '/carriers',
        addCarrier: '/addcarrier',
        editCarrier: '/updatecarrier',
        getCarrier: '/carrier/',
        services : '/services',
        service : 'service',
        addService : '/addservice',
        updateService : '/updateservice',
        servicesByCarrier: '/servicesbycarrier'
    });