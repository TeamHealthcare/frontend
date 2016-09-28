$(window).load(function(){
    patientRecords.angular.patients.addPatient("Edward","Snowden","405-555-0180","1931-03-11","Male","test");
    patientRecords.angular.patients.addPatient("Donald","Trump","617-555-0122","1965-05-26","Male","test");
    patientRecords.angular.patients.addPatient("Hillary","Clinton","614-555-0145","1946-10-17","Female","test");

    var appElement = document.querySelector('[ng-app=patientRecordsApp]');
    var $scope = angular.element(appElement).scope();
    $scope.$apply();
})

