(function (models) {
    var Patient = (function () {
        function Patient(PatientId,
                         PatientName,
                         PhoneNumber,
                         Address,
                         City,
                         State,
                         ZipCode,
                         InsuranceCarrierId,
                         DateOfBirth,
                         Gender,
                         physician,
                         medications,
                         appointments) {
            this.PatientId = PatientId;
            this.PatientName = PatientName;
            this.PhoneNumber = PhoneNumber;
            this.Address = Address;
            this.City = City;
            this.State = State;
            this.ZipCode = ZipCode;
            this.InsuranceCarrierId = InsuranceCarrierId;
            this.DateOfBirth = DateOfBirth;
            this.Gender = Gender;
            this.physician = physician;
            this.medications = medications;
            this.appointments = appointments;
        }
        return Patient;
    }());
    models.Patient = Patient;
})(models || (models = {}));