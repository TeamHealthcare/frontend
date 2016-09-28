(function(window,undefined){
var patientRecordsApp = angular.module('patientRecordsApp', ['ui.bootstrap']);

patientRecordsApp.service('PatientService', ['$window', function(window){
	var patients = [];
	var curPatient = {
        id: undefined,
        firstName: undefined,
        lastName: undefined,
        contact: undefined,
        dateOfBirth: undefined,
        gender: undefined,
        primaryPhysician: undefined
    };
	var uid = 1;

	this.getCurPatient = function(){
		return curPatient;
	}
    window.patientRecords.angular.patients.getCurPatient = this.getCurPatient;
	this.setCurPatient = function(newCurPatientID){
        var patient = this.getPatient(newCurPatientID);
        if(!patient){
            throw "Error: can not set a patient by id if patient not found in patient list.";
        }
		curPatient.id = patient.id;
        curPatient.firstName = patient.firstName;
        curPatient.lastName = patient.lastName;
        curPatient.contact = patient.contact;
        curPatient.dateOfBirth = patient.dateOfBirth;
        curPatient.gender = patient.gender;
        curPatient.primaryPhysician = patient.primaryPhysician;
	}
    window.patientRecords.angular.patients.setCurPatient = this.setCurPatient;
    this.clearCurPatient = function(){
		if(curPatient.id === undefined){
            curPatient.id = undefined;
            curPatient.firstName = undefined;
            curPatient.lastName = undefined;
            curPatient.contact = undefined;
            curPatient.dateOfBirth = undefined;
            curPatient.gender = undefined;
            curPatient.primaryPhysician = undefined;
        }
	}
    window.patientRecords.angular.patients.clearCurPatient = this.clearCurPatient;
    this.editCurPatient = function(firstName,lastName,contact,dateOfBirth,gender,primaryPhysician){
        curPatient.firstName = firstName || curPatient.firstName;
        curPatient.lastName = lastName || curPatient.lastName;
        curPatient.contact = contact || curPatient.contact;
        curPatient.dateOfBirth = dateOfBirth || curPatient.dateOfBirth;
        curPatient.gender = gender || curPatient.gender;
        curPatient.primaryPhysician = primaryPhysician || curPatient.primaryPhysician;   
        var patient = this.getPatient(curPatient.id);
        if(!patient){
            throw "Error: Current patient info could not be update. Was not found in mem."
        }
        patient.id = patient.id;
        patient.firstName = curPatient.firstName;
        patient.lastName = curPatient.lastName;
        patient.contact = curPatient.contact;
        patient.dateOfBirth = curPatient.dateOfBirth;
        patient.gender = curPatient.gender;
        patient.primaryPhysician = curPatient.primaryPhysician;
    }
    window.patientRecords.angular.patients.editCurPatient = this.editCurPatient;

	this.addPatient = function(firstName,lastName,contact,dateOfBirth,gender,primaryPhysician){
		patients.push({
			id: uid++,
			firstName: firstName,
            lastName: lastName,
			contact: contact,
			dateOfBirth: dateOfBirth, 
            gender: gender,
            primaryPhysician: primaryPhysician
		});
	}
    window.patientRecords.angular.patients.addPatient = this.addPatient;
	this.getPatient = function(patientID){
		for(var i = 0; i < patients.length; i++){
			if(patients[i].id === patientID){
				return patients[i];
			}
		}
		return false;
	}
    window.patientRecords.angular.patients.getPatient = this.getPatient;
	this.removePatient = function(patientID){
		for(var i = 0; i < patients.length; i++){
			if(patients[i].id === patientID){
				if(patientID === curPatient.id){
                curPatient.id = undefined;
                curPatient.firstName = undefined;
                curPatient.lastName = undefined;
                curPatient.contact = undefined;
                curPatient.dateOfBirth = undefined;
                curPatient.gender = undefined;
                curPatient.primaryPhysician = undefined;
				}
				return patients.splice(i,1);
			}
		}
		return false;
	}
    window.patientRecords.angular.patients.removePatient = this.removePatient;
    this.getPatients = function(){
        return patients;
	}
    window.patientRecords.angular.patients.getPatients = this.getPatients;
}]);

patientRecordsApp.controller('patientsList', ['$scope','$window', 'PatientService', function ($scope, $window, PatientService){
    $scope.patients = PatientService.getPatients();
    $scope.curPatient = PatientService.getCurPatient();
    $scope.isSelected = false;

    $scope.setCurPatient = function(patient){
        if(patient === undefined || patient.id === undefined){
            throw "Error: Can not set current patient to undefined";
        }
        isSelected = true;
        PatientService.setCurPatient(patient.id);
    }
}]);

})();