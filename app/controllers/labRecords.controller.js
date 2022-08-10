const db = require("../models");
const LabRecords = db.labRecords;

//Create and Save a new labRecords
exports.create = async (req,res) => {
    // validate request
    if (!req.body.patientHCNumber) {
        res.status(400).send({ message: "patientHCNumbercannot be empty!"});
        return;
    }

    //create labRecord
    const labRecord = new LabRecords ({
        patientHCNumber: req.body.patientHCNumber,
        dateIssued: req.body.dateIssued,
        result: req.body.result,
        notes: req.body.notes
    });

    //save labRecord in the database
    labRecord
        .save(labRecord)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured while creating the labRecord"
            });
        });
        
};

//Retrieve all labRecords from the database
exports.findAll = (req,res) => {
    const patientHCNumber = req.query.patientHCNumber;
    var condition = patientHCNumber ? { patientHCNumber: { $regex: new RegExp(patientHCNumber), $options: "i"} } : {};

    LabRecords.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving labRecords."
            });
        });

};

// Find a single labRecord with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    LabRecords.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: " labRecord not found with id " + id})
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving labRecord with id=" + id})
        });
};

// Update a LabRecord by the id in the request
exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Data to update can not be empty"
        })
    }
    const id = req.params.id;
    LabRecords.findByIdAndUpdate(id, req.body, { useFindAndModify : false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update LabRecord with id= ${id}. Maybe LabRecord was not found!`
                });
            }else res.send({ message: "LabRecord was updated successfully."});  
        })
        .catch(err => {
            res.status(500).send({
                message:"Error updating LabRecord with id=" + id
            });
    });
};

// Delete a LabRecord with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    LabRecords.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(400).send({
                    message: `Connot delete LabRecord with id=${id}. Maybe LabRecord was not found!`
                });
            } else {
                res.send({
                    message: "LabRecord was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete LabRecord with id=" + id
            });
        });
};

// Delete all LabRecords from the database.
exports.deleteAll = (req, res) => {
    LabRecords.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} LabRecords were deleted successfully`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "some error occurred while removing all LabRecordss."
            })
        })
};

// Find all LabRecords with the specified patientHCNumber in the request
exports.findByPatientHCNumber = (req, res) => {
    const patientHCNumber = req.params.patientHCNumber;
    LabRecords.find({ patientHCNumber: patientHCNumber})
        .then(data => {
            if (!data)
                res.status(404).send({ message: " LabRecord not found with patientHCNumber " + patientHCNumber})
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving LabRecord with patientHCNumber=" + patientHCNumber})
        });
}

// Find all LabRecords with the specified dateIssued in the request
exports.findByDateIssued = (req, res) => {
    const dateIssued = req.params.dateIssued;
    LabRecords.find({ dateIssued: dateIssued})
        .then(data => {
            if (!data)
                res.status(404).send({ message: " LabRecord not found with dateIssued " + dateIssued})
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving LabRecord with dateIssued=" + dateIssued})
        });
}