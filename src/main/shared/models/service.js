(function (models) {
    var Service = (function () {
        function Service(ServiceId,
        		         Description,
        		         Cost
        				) {
            this.ServiceId = ServiceId;
            this.Description = Description;
            this.Cost = Cost;
        }
        return Service;
    }());
    models.Service = Service;
})(models || (models = {}));