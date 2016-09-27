(function(window,undefined){
var schedulerApp = angular.module('schedulerApp', ['ui.bootstrap']);

schedulerApp.service('PhysicianService', ['$window', function(window){
	var physicians = [];
	var curPhysician = {
        id: undefined,
        name: undefined,
        contact: undefined,
        schedule: undefined
    };
	var uid = 1;

	this.getCurPhysician = function(){
		return curPhysician;
	}
    window.scheduler.angular.physicians.getCurPhysician = this.getCurPhysician;
	this.setCurPhysician = function(newCurPhysID){
        var physician = this.getPhysician(newCurPhysID);
        if(!physician){
            throw "Error: can not set a physician by id if physician not found in physician list.";
        }
		curPhysician.id = physician.id;
        curPhysician.name = physician.name;
        curPhysician.contact = physician.contact;
        curPhysician.schedule = physician.schedule;
	}
    window.scheduler.angular.physicians.setCurPhysician = this.setCurPhysician;
    this.clearCurPhysician = function(){
		if(curPhysician.id === undefined){
            curPhysician.id = undefined;
            curPhysician.name = undefined;
            curPhysician.contact = undefined;
            curPhysician.schedule = undefined;
        }
	}
    window.scheduler.angular.physicians.clearCurPhysician = this.clearCurPhysician;
    this.editCurPhysician = function(name,contact,schedule){
        curPhysician.name = name || curPhysician.name;
        curPhysician.contact = contact || curPhysician.contact;
        curPhysician.schedule = schedule || curPhysician.schedule;
        var physician = this.getPhysician(curPhysician.id);
        if(!physician){
            throw "Error: Current physician info could not be update. Was not found in mem."
        }
        physician.name = curPhysician.name;
        physician.contact = curPhysician.contact;
        physician.schedule = curPhysician.schedule;
    }
    window.scheduler.angular.physicians.editCurPhysician = this.editCurPhysician;

	this.addPhysician = function(name,contact,schedule){
		physicians.push({
			id: uid++,
			name: name,
			contact: contact,
			schedule: schedule
		});
	}
    window.scheduler.angular.physicians.addPhysician = this.addPhysician;
	this.getPhysician = function(physicianID){
		for(var i = 0; i < physicians.length; i++){
			if(physicians[i].id === physicianID){
				return physicians[i];
			}
		}
		return false;
	}
    window.scheduler.angular.physicians.getPhysician = this.getPhysician;
	this.removePhysician = function(physicianID){
		for(var i = 0; i < physicians.length; i++){
			if(physicians[i].id === physicianID){
				if(physicianID === curPhysician.id){
					curPhysician.id = undefined;
                    curPhysician.name = undefined;
                    curPhysician.contact = undefined;
                    curPhysician.schedule = undefined;
				}
				return physicians.splice(i,1);
			}
		}
		return false;
	}
    window.scheduler.angular.physicians.removePhysician = this.removePhysician;
    this.getPhysicians = function(){
        return physicians;
	}
    window.scheduler.angular.physicians.getPhysicians = this.getPhysicians;
}]);

angular.module('schedulerApp').controller('DropdownCtrl', ['$scope','$window', 'PhysicianService', function ($scope, $window, PhysicianService){
    $scope.dropdownModals = [
        {text:"Patient Scheduler",modalID:"patient-scheduler",show:false, showCases: {physSelected:true,physUnselected:false}},
        {text:"Physician Availability",modalID:"physician-availability-editor",show:false, showCases: {physSelected:true,physUnselected:false}},
        {text:"Add Physician",modalID:"physician-adder",show:true, showCases: {physSelected:true,physUnselected:true}},
        {text:"Edit Physician",modalID:"physician-editor",show:false, showCases: {physSelected:true,physUnselected:false}},
        {text:"Remove Physician",modalID:"physician-remover",show:false, showCases: {physSelected:true,physUnselected:false}},
    ];

    $scope.toggled = function(open){
        var physSelec = PhysicianService.getCurPhysician().id !== undefined;
        for(var i = 0; i < $scope.dropdownModals.length; i++){
            $scope.dropdownModals[i].show = (
                $scope.dropdownModals[i].showCases["physSelected"] === physSelec ||
                !($scope.dropdownModals[i].showCases["physUnselected"]) === physSelec
            )
        }
    }
}]);

schedulerApp.controller('PhysicianAdder', ['$scope','$window', 'PhysicianService', function ($scope, $window, PhysicianService){
    $scope.physicianAdder = {
        name: undefined,
        contact: undefined,
        schedule: undefined,
    }
    $scope.validateInput = function(modalID){
        if($scope.physicianAdder.name === undefined || $scope.physicianAdder.contact === undefined || $scope.physicianAdder.schedule === undefined || $scope.physicianAdder.name === "" || $scope.physicianAdder.contact === "" || $scope.physicianAdder.schedule === ""){
            return;
        }
        PhysicianService.addPhysician($scope.physicianAdder.name, $scope.physicianAdder.contact, $scope.physicianAdder.schedule);
        $('#'+modalID).modal('toggle');
        $scope.physicianAdder.name = undefined;
        $scope.physicianAdder.contact = undefined;
        $scope.physicianAdder.schedule = undefined;
    }
}]);
  
angular.module('schedulerApp').controller('RemovePhysician', ['$scope','$window', 'PhysicianService', function ($scope, $window, PhysicianService){
    $scope.curPhysician = PhysicianService.getCurPhysician();

    $scope.removePhysician = function(modalID){
        PhysicianService.removePhysician($scope.curPhysician.id);
        $('#'+modalID).modal('toggle');
        PhysicianService.clearCurPhysician();
    }
}]);

angular.module('schedulerApp').controller('PhysicianEditor', ['$scope','$window', 'PhysicianService', function ($scope, $window, PhysicianService){
    $scope.physicianEditor = {
        name: undefined,
        contact: undefined,
        schedule: undefined,
    }
    $scope.curPhysician = PhysicianService.getCurPhysician();

    $scope.editPhysician = function(modalID){
        PhysicianService.editCurPhysician($scope.physicianEditor.name, $scope.physicianEditor.contact, $scope.physicianEditor.schedule);
        $('#'+modalID).modal('toggle');
        $scope.physicianEditor.name = undefined;
        $scope.physicianEditor.contact = undefined;
        $scope.physicianEditor.schedule = undefined;
    }
    
}]);

angular.module('schedulerApp').controller('PhysiciansList', ['$scope','$window', 'PhysicianService', function ($scope, $window, PhysicianService){
    $scope.physicians = PhysicianService.getPhysicians();
    $scope.curPhysician = PhysicianService.getCurPhysician();

    $scope.setCurPhysician = function(physician){
        if(physician === undefined || physician.id === undefined){
            throw "Error: Can not set current physician to undefined";
        }
        PhysicianService.setCurPhysician(physician.id);
    }
}]);

angular.module('schedulerApp').controller('PhysicianAvailabilityPicker', ['$scope','$window', function ($scope, $window){
    $scope.dp1 = {
        date: new Date(),
        setDate: function(year, month, day){
            $scope.dp1.date = new Date(year, month, day);
        },
        opened: false,
        open: function() {
            $scope.dp1.opened = true;
        }
    }

    $scope.dp2 = {
        date: new Date(),
        setDate: function(year, month, day){
            $scope.dp2.date = new Date(year, month, day);
        },
        opened: false,
        open: function() {
            $scope.dp2.opened = true;
        }
    }

    $scope.tp1 = {
        time: new Date(),
        setTime: function(){
            var d = new Date();
            d.setHours( 14 );
            d.setMinutes( 0 );
            $scope.tp1.time = d;
        }
    }

    $scope.tp2 = {
        time: new Date(),
        setTime: function(){
            var d = new Date();
            d.setHours( 14 );
            d.setMinutes( 0 );
            $scope.tp2.time = d;
        }
    }

    //Time picker options start
    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    //Time picker options end

    //From this point onwards, datepicker code
    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
    //    var date = data.date,
    //      mode = data.mode;
    //    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
        mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

}]);

angular.module('schedulerApp').controller('PatientSchedulerPicker', ['$scope','$window', function ($scope, $window){
    $scope.dp1 = {
        date: new Date(),
        setDate: function(year, month, day){
            $scope.dp1.date = new Date(year, month, day);
        },
        opened: false,
        open: function() {
            $scope.dp1.opened = true;
        }
    }

    $scope.dp2 = {
        date: new Date(),
        setDate: function(year, month, day){
            $scope.dp2.date = new Date(year, month, day);
        },
        opened: false,
        open: function() {
            $scope.dp2.opened = true;
        }
    }

    $scope.tp1 = {
        time: new Date(),
        setTime: function(){
            var d = new Date();
            d.setHours( 14 );
            d.setMinutes( 0 );
            $scope.tp1.time = d;
        }
    }

    $scope.tp2 = {
        time: new Date(),
        setTime: function(){
            var d = new Date();
            d.setHours( 14 );
            d.setMinutes( 0 );
            $scope.tp2.time = d;
        }
    }

    //Time picker options start
    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    //Time picker options end

    //From this point onwards, datepicker code
    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
    //    var date = data.date,
    //      mode = data.mode;
    //    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
        mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
}]);
})();