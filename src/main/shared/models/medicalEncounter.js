(function (models) {
    var MedicalEncounter = (function () {
        function MedicalEncounter(id,
                                  encounterDate,
                                  practitioner,
                                  complaint,
                                  vitalSigns,
                                  notes,
                                  labOrderId,
                                  pharmacyOrder,
                                  diagnosis,
                                  treatmentPlan,
                                  referral,
                                  followUpNotes) {
            this.id = id;
            this.encounterDate = encounterDate;
            this.practitioner = practitioner;
            this.complaint = complaint;
            this.vitalSigns = vitalSigns;
            this.notes = notes;
            this.labOrderId = labOrderId;
            this.pharmacyOrder = pharmacyOrder;
            this.diagnosis = diagnosis;
            this.treatmentPlan = treatmentPlan;
            this.referral = referral;
            this.followUpNotes = followUpNotes;
        }
        return MedicalEncounter;
    }());
    models.MedicalEncounter = MedicalEncounter;
})(models || (models = {}));