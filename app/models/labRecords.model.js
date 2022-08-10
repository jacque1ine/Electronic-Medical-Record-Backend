module.exports = mongoose => {
    // https://mongoosejs.com/docs/api/model.html#model_Model
    const labRecords = mongoose.model(
       "LabRecords",
       mongoose.Schema(
          {
            patientHCNumber: String,
            dateIssued: String,
            result: String,
            notes: String

          },
          { timestamps: true }
       )
    );
    return labRecords;
 };
 