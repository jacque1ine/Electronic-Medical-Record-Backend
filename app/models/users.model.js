module.exports = mongoose => {
    // https://mongoosejs.com/docs/api/model.html#model_Model
    const users = mongoose.model(
       "Users",
       mongoose.Schema(
          {
             doctorID: String,
             signInID: String,
             password: String,
             doctorFirstName: String,
             doctorLastName: String,
             isAdmin: Boolean,
          },
          { timestamps: true }
       )
    );
    return users;
 };
 