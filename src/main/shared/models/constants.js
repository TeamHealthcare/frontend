angular.module('hcare')
    .constant('URLS', {
        base: 'http://localhost:8888/hcare/backend/v1',
        patients: '/patients',
        addPatient: '/addepatient',
        editPatient: '/updatepatient',
        encounters: '/getMedicalEncounters',
        addEncounter: '/addencounter',
        editEncounter: '/updateencounter',
        insuranceCarriers: '/carriers'
    });