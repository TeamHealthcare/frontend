(function (models) {
    var Carrier = (function () {
        function Carrier(InsuranceCarrierId,
        		         Carrier,
                         Address,
                         Active) {
            this.InsuranceCarrierId = InsuranceCarrierId;
            this.Carrier = Carrier;
            this.Address = Address;
            this.Active = Active;
        }
        return Carrier;
    }());
    models.Carrier = Carrier;
})(models || (models = {}));