const db = require("../models");
const patient = db.patients;

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.HCNumber) {
       res.status(400).send({ message: "Content can not be empty!" });
       return;
    }
    // Create a Patient History Record
    const cal = new patient({
        HCNumber: req.body.HCNumber,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        address: req.body.address,
        relations: req.body.relations, // Could be an object as well
        age: req.body.age,
        sex: req.body.sex,
        height: req.body.height, // cm
        weight: req.body.weight, // kg
        status: req.body.status,
        prescription: req.body.presc
    });
    // Save Tutorial in the database
    try {
       const data = await cal.save(cal);
       res.send(data);
    } catch (e) {
       res.status(500).send({
          message:
             e.message || "Some error occurred while creating the patient."
       });
    }
 };

 exports.findAll = (req, res) => {
    const title = req.query.HCNumber;
    var condition = title ? { HCNumber: { $regex: new RegExp(title), $options: "i" } } : {};
    patient.find(condition)
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
    patient.findById(id)
       .then(data => {
          if (!data)
             res.status(404).send({ message: "Not found patient with id " + id });
          else res.send(data);
       })
       .catch(err => {
          res
             .status(500)
             .send({ message: "Error retrieving patient with id=" + id });
       });
    };

    exports.findbyHC = (req, res) => {
        const hcNumber = req.params.HCNumber;
        patient.findOne({ HCNumber: `${hcNumber}` })
           .then(data => {
              if (!data)
                 res.status(404).send({ message: "Not found patient with hcNumber " + hcNumber });
              else res.send(data);
           })
           .catch(err => {
              res
                 .status(500)
                 .send({ message: "Error retrieving patient with hcNumber=" + hcNumber });
           });
    };

    exports.addSinglePrescription = async (req,res) => {
      if (!req.params.presc) {
         return res.status(400).send({
            message: "Data to update can not be empty!"
         });
      }
      const id = req.params.HCNumber;
      
      let patient1 = await patient.findOne({ HCNumber: `${id}` });

        
      console.log(patient1);
      const patient1Presc = patient1.prescription;
      patient1Presc[patient1Presc.length] = req.params.presc;
      patient.update({HCNumber: `${id}`}, {prescription: `${patient1Presc}`})
         .then(data => {
            if (!data) {
               res.status(404).send({
                  message: `Cannot update patient with id=${id}. Maybe Sample was not found!`
               });
            } else res.send({ message: "Patient was updated successfully." });
         })
         .catch(err => {
            res.status(500).send({
               message: "Error updating Sample with id=" + id
            });
         });
    }

 exports.updatebyHC = (req, res) => {
    if (!req.body) {
       return res.status(400).send({
          message: "Data to update can not be empty!"
       });
    }
    const hcNumber = req.params.HCNumber;
    patient.findOneAndUpdate({ HCNumber: `${hcNumber}` }, req.body, { useFindAndModify: false })
       .then(data => {
          if (!data) {
             res.status(404).send({
                message: `Cannot update patient with HC Number =${hcNumber}. Maybe patient was not found!`
             });
          } else res.send({ message: "patient was updated successfully." });
       })
       .catch(err => {
          res.status(500).send({
             message: "Error updating patient with HC Number =" + hcNumber
          });
       });
 };

 exports.delete = (req, res) => {
    const hcNumber = req.params.HCNumber;
    patient.findOneAndRemove(hcNumber)
       .then(data => {
          if (!data) {
             res.status(404).send({
                message: `Cannot delete patient with hcNumber=${hcNumber}. Maybe Sample was not found!`
             });
          } else {
             res.send({
                message: "patient was deleted successfully!"
             });
          }
       })
       .catch(err => {
          res.status(500).send({
             message: "Could not delete patient with hcNumber=" + hcNumber
          });
       });
 };