$(window).load(function(){
    scheduler.angular.physicians.addPhysician("Edward Snowden","8675309","M-F 9:00 AM - 5:00 PM");
    scheduler.angular.physicians.addPhysician("Donald Trump","9177568000","M,W,F 9:00 AM - 5:00 PM");
    scheduler.angular.physicians.addPhysician("Hillary Clinton","6468541432","Sa,Su 10:00 AM - 12:00 PM");

    var appElement = document.querySelector('[ng-app=schedulerApp]');
    var $scope = angular.element(appElement).scope();
    $scope.$apply();
})

