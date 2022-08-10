module.exports = mongoose => {
    // https://mongoosejs.com/docs/api/model.html#model_Model
    const sample = mongoose.model(
       "sample",
       mongoose.Schema(
          {
             title: String,
             description: String,
             visible: Boolean
          },
          { timestamps: true }
       )
    );
    return sample;
 };
 