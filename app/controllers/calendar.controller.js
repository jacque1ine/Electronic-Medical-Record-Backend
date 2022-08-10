const db = require("../models");
const Calendar = db.calendar;

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.appointmentTitle) {
       res.status(400).send({ message: "Content can not be empty!" });
       return;
    }
    // Create a Tutorial
    const cal = new Calendar({
        appointmentTitle: req.body.appointmentTitle,
        dateTime: req.body.dateTime,
        patientHCNumber: req.body.patientHCNumber,
        appointmentdesc: req.body.appointmentdesc,
        notes: req.body.notes,
        colour: req.body.colour
    });
    // Save Tutorial in the database
    try {
       const data = await cal.save(cal);
       res.send(data);
    } catch (e) {
       res.status(500).send({
          message:
             e.message || "Some error occurred while creating the calendar item."
       });
    }
 };

 exports.findAll = (req, res) => {
    const title = req.query.appointmentTitle;
    var condition = title ? { appointmentTitle: { $regex: new RegExp(title), $options: "i" } } : {};
    Calendar.find(condition)
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
    Calendar.findById(id)
       .then(data => {
          if (!data)
             res.status(404).send({ message: "Not found Calendar with id " + id });
          else res.send(data);
       })
       .catch(err => {
          res
             .status(500)
             .send({ message: "Error retrieving Calendar with id=" + id });
       });
 };

 exports.update = (req, res) => {
    if (!req.body) {
       return res.status(400).send({
          message: "Data to update can not be empty!"
       });
    }
    const id = req.params.id;
    Calendar.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

 exports.delete = (req, res) => {
    const id = req.params.id;
    Calendar.findByIdAndRemove(id)
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