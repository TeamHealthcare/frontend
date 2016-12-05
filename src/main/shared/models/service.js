(function (models) {
    var Service = (function () {
        function Service(ServiceId,
        				 InsuranceCarrierId,
        		         Description,
        		         Cost
        				) {
            this.ServiceId = ServiceId;
            this.InsuranceCarrierId = InsuranceCarrierId;
            this.Description = Description;
            this.Cost = Cost;
        }
        return Service;
    }());
    models.Service = Service;
})(models || (models = {}));