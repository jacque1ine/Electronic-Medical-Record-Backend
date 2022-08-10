module.exports = mongoose => {
    // https://mongoosejs.com/docs/api/model.html#model_Model
    const notes = mongoose.model(
       "Notes",
       mongoose.Schema(
          {
             patientHCNumber: String,
             noteContent: String,
             doctorID: String,
             dateTime: String
          },
          { timestamps: true }
       )
    );
    return notes;
 };
 