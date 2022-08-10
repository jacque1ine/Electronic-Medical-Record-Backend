const db = require("../models");
const Sample = db.sample;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.title) {
       res.status(400).send({ message: "Content can not be empty!" });
       return;
    }
    // Create a Tutorial
    const sample = new Sample({
       title: req.body.title,
       description: req.body.description,
       published: req.body.published ? req.body.published : false
    });
    // Save Tutorial in the database
    try {
       const data = await sample.save(sample);
       res.send(data);
    } catch (e) {
       res.status(500).send({
          message:
             e.message || "Some error occurred while creating the Sample Data."
       });
    }
 };
 // Retrieve all Tutorials from the database.
 exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Sample.find(condition)
       .then(data => {
          res.send(data);
       })
       .catch(err => {
          res.status(500).send({
             message:
                err.message || "Some error occurred while retrieving tutorials."
          });
       });
 };
 // Find a single Tutorial with an id
 exports.findOne = (req, res) => {
    const id = req.params.id;
    Sample.findById(id)
       .then(data => {
          if (!data)
             res.status(404).send({ message: "Not found Tutorial with id " + id });
          else res.send(data);
       })
       .catch(err => {
          res
             .status(500)
             .send({ message: "Error retrieving Tutorial with id=" + id });
       });
 };
 // Update a Sample Data by the id in the request
 exports.update = (req, res) => {
    if (!req.body) {
       return res.status(400).send({
          message: "Data to update can not be empty!"
       });
    }
    const id = req.params.id;
    Sample.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
       .then(data => {
          if (!data) {
             res.status(404).send({
                message: `Cannot update Sample with id=${id}. Maybe Sample was not found!`
             });
          } else res.send({ message: "Sample was updated successfully." });
       })
       .catch(err => {
          res.status(500).send({
             message: "Error updating Sample with id=" + id
          });
       });
 };
 // Delete a Tutorial with the specified id in the request
 exports.delete = (req, res) => {
    const id = req.params.id;
    Sample.findByIdAndRemove(id)
       .then(data => {
          if (!data) {
             res.status(404).send({
                message: `Cannot delete Sample with id=${id}. Maybe Sample was not found!`
             });
          } else {
             res.send({
                message: "Sample was deleted successfully!"
             });
          }
       })
       .catch(err => {
          res.status(500).send({
             message: "Could not delete Sample with id=" + id
          });
       });
 };
 // Delete all Tutorials from the database.
 exports.deleteAll = (req, res) => {
    Sample.deleteMany({})
       .then(data => {
          res.send({
             message: `${data.deletedCount} Samples were deleted successfully!`
          });
       })
       .catch(err => {
          res.status(500).send({
             message:
                err.message || "Some error occurred while removing all Samples."
          });
       });
 };
 // Find all published Tutorials
 exports.findAllPublished = (req, res) => {
    Sample.find({ visible: true })
       .then(data => {
          res.send(data);
       })
       .catch(err => {
          res.status(500).send({
             message:
                err.message || "Some error occurred while retrieving samples."
          });
       });
 };