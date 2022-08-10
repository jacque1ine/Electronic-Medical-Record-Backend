const db = require("../models");
const Notes = db.notes;

//Create and Save a new Note
exports.create = async (req,res) => {
    // validate request
    if (!req.body.noteContent) {
        res.status(400).send({ message: "Content cannot be empty!"});
        return;
    }

    //create Note
    const note = new Notes ({
        patientHCNumber: req.body.patientHCNumber,
        noteContent: req.body.noteContent,
        doctorID: req.body.doctorID,
        dateTime: req.body.dateTime
    });

    //save Note in the database
    note
        .save(note)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured while creating the Note"
            });
        });
        
};

//Retrieve all Notes from the database
exports.findAll = (req,res) => {
    const noteContent = req.query.noteContent;
    var condition = noteContent ? { noteContent: { $regex: new RegExp(noteContent), $options: "i"} } : {};

    Notes.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Notes."
            });
        });

};

// Find a single Note with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Notes.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: " Note not found with id " + id})
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Note with id=" + id})
        });
};

// Update a Note by the id in the request
exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Data to update can not be empty"
        })
    }
    const id = req.params.id;
    Notes.findByIdAndUpdate(id, req.body, { useFindAndModify : false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Note with id= ${id}. Maybe Note was not found!`
                });
            }else res.send({ message: "Note was updated successfully."});  
        })
        .catch(err => {
            res.status(500).send({
                message:"Error updating Note with id=" + id
            });
    });
};

// Delete a Note with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Notes.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(400).send({
                    message: `Connot delete Note with id=${id}. Maybe Note was not found!`
                });
            } else {
                res.send({
                    message: "Note was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Note with id=" + id
            });
        });
};

// Delete all Notes from the database.
exports.deleteAll = (req, res) => {
    Notes.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Notes were deleted successfully`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "some error occurred while removing all Notes."
            })
        })
};

// Find all Notes with the specified patientHCNumber in the request
exports.findByPatientHCNumber = (req, res) => {
    const patientHCNumber = req.params.patientHCNumber;
    Notes.find({ patientHCNumber: patientHCNumber})
        .then(data => {
            if (!data)
                res.status(404).send({ message: " Note not found with patientHCNumber " + patientHCNumber})
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Note with patientHCNumber=" + patientHCNumber})
        });
}

// Find all Notes with the specified doctorID in the request
exports.findByDoctorID = (req, res) => {
    const doctorID = req.params.doctorID;
    Notes.find({ doctorID: doctorID})
        .then(data => {
            if (!data)
                res.status(404).send({ message: " Note not found with doctorID " + doctorID})
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Note with doctorID=" + doctorID})
        });
}

/* - want to implement
exports.findByDateTimeRange = (req,res) => {
    //req provides a timeDate range and the notes which fall in the range are returned
}*/