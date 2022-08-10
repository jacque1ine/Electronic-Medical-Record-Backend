const db = require("../models");
const pHist = db.patientHistory;

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.patientHCNumber) {
       res.status(400).send({ message: "Content can not be empty!" });
       return;
    }
    // Create a Patient History Record
    const cal = new pHist({
        patientHCNumber: req.body.patientHCNumber,
        allergies: req.body.allergies,
        prevConditions: req.body.prevConditions, // Array of objects
        prevVisits: req.body.prevVisits,
        immunizationHist: req.body.immunizationHist,
        imaging: req.body.imaging, // Objects
        notes: req.body.notes
    });
    // Save Tutorial in the database
    try {
       const data = await cal.save(cal);
       res.send(data);
    } catch (e) {
       res.status(500).send({
          message:
             e.message || "Some error occurred while creating the patient history record."
       });
    }
 };

 exports.findAll = (req, res) => {
    const title = req.query.patientHCNumber;
    var condition = title ? { patientHCNumber: { $regex: new RegExp(title), $options: "i" } } : {};
    pHist.find(condition)
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
    pHist.findById(id)
       .then(data => {
          if (!data)
             res.status(404).send({ message: "Not found pHist with id " + id });
          else res.send(data);
       })
       .catch(err => {
          res
             .status(500)
             .send({ message: "Error retrieving pHist with id=" + id });
       });
    };

    exports.findbyHC = (req, res) => {
        const hcNumber = req.params.patientHCNumber;
        pHist.findOne({ patientHCNumber: `${hcNumber}` })
           .then(data => {
              if (!data)
                 res.status(404).send({ message: "Not found pHist with hcNumber " + hcNumber });
              else res.send(data);
           })
           .catch(err => {
              res
                 .status(500)
                 .send({ message: "Error retrieving pHist with hcNumber=" + hcNumber });
           });
    };

 exports.updatebyHC = (req, res) => {
    if (!req.body) {
       return res.status(400).send({
          message: "Data to update can not be empty!"
       });
    }
    const hcNumber = req.params.patientHCNumber;
    pHist.findOneAndUpdate({ patientHCNumber: `${hcNumber}` }, req.body, { useFindAndModify: false })
       .then(data => {
          if (!data) {
             res.status(404).send({
                message: `Cannot update pHist with HC Number =${hcNumber}. Maybe pHist was not found!`
             });
          } else res.send({ message: "pHist was updated successfully." });
       })
       .catch(err => {
          res.status(500).send({
             message: "Error updating pHist with HC Number =" + hcNumber
          });
       });
 };

 exports.delete = (req, res) => {
    const hcNumber = req.params.patientHCNumber;
    pHist.findOneAndRemove(hcNumber)
       .then(data => {
          if (!data) {
             res.status(404).send({
                message: `Cannot delete pHist with hcNumber=${hcNumber}. Maybe Sample was not found!`
             });
          } else {
             res.send({
                message: "pHist was deleted successfully!"
             });
          }
       })
       .catch(err => {
          res.status(500).send({
             message: "Could not delete pHist with hcNumber=" + hcNumber
          });
       });
 };