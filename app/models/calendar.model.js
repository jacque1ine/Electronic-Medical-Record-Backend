module.exports = mongoose => {
    // https://mongoosejs.com/docs/api/model.html#model_Model
    const calendar = mongoose.model(
       "calendar",
       mongoose.Schema(
          {
            appointmentTitle: String,
            dateTime: String,
            patientHCNumber: String,
            appointmentdesc: String,
            notes: String,
            colour: String,
          },
          { timestamps: true }
       )
    );
    return calendar;
 };
 