(function (models) {
    var Patient = (function () {
        function Patient(id,
                         name,
                         phone,
                         address,
                         insurance,
                         dateOfBirth,
                         gender,
                         physician,
                         medications,
                         appointments) {
            this.id = id;
            this.name = name;
            this.phone = phone;
            this.address = address;
            this.insurance = insurance;
            this.dateOfBirth = dateOfBirth;
            this.gender = gender;
            this.physician = physician;
            this.medications = medications;
            this.appointments = appointments;
        }
        return Patient;
    }());
    models.Patient = Patient;
})(models || (models = {}));