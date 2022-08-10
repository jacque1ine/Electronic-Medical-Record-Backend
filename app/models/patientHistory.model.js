module.exports = mongoose => {
    // https://mongoosejs.com/docs/api/model.html#model_Model
    const patientHistory = mongoose.model(
       "PatientHistory",
       mongoose.Schema(
          {
            patientHCNumber: String,
            allergies: Array,
            prevConditions: Array, // Array of objects
            prevVisits: Array,
            immunizationHist: Array,
            imaging: Array, // Objects
            notes: String
          },
          { timestamps: true }
       )
    );
    return patientHistory;
 };
 