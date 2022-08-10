const db = require("../models");
const Users = db.users;

//Create and Save a new Users
exports.create = async (req,res) => {
    // validate request
    if (!req.body.doctorID) {
        res.status(400).send({ message: "doctorID cannot be empty!"});
        return;
    }

    //create User
    const user = new Users ({
        doctorID: req.body.doctorID,
        signInID: req.body.signInID,
        password: req.body.password,
        doctorFirstName: req.body.doctorFirstName,
        doctorLastName: req.body.doctorLastName,
        isAdmin: req.body.isAdmin,
    });

    //save User in the database
    user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured while creating the User"
            });
        });
        
};

//Retrieve all Users from the database
exports.findAll = (req,res) => {
    const doctorID = req.query.doctorID;
    var condition = doctorID ? { doctorID: { $regex: new RegExp(doctorID), $options: "i"} } : {};

    Users.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });

};

// Find a single user with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Users.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: " User not found with id " + id})
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with id=" + id})
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Data to update can not be empty"
        })
    }
    const id = req.params.id;
    Users.findByIdAndUpdate(id, req.body, { useFindAndModify : false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id= ${id}. Maybe User was not found!`
                });
            }else res.send({ message: "User was updated successfully."});  
        })
        .catch(err => {
            res.status(500).send({
                message:"Error updating User with id=" + id
            });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Users.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(400).send({
                    message: `Connot delete User with id=${id}. Maybe User was not found!`
                });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    Users.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Users were deleted successfully`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "some error occurred while removing all Userss."
            })
        })
};

// Find all Users with the specified doctorID in the request
exports.findByDoctorID = (req, res) => {
    const doctorID = req.params.doctorID;
    Users.find({ doctorID: doctorID})
        .then(data => {
            if (!data)
                res.status(404).send({ message: " User not found with doctorID " + doctorID})
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with doctorID=" + doctorID})
        });
}

// Find all Users with the specified signinID in the request
exports.findBySignInID = (req, res) => {
    const signinID = req.params.signinID;
    const password = req.params.password;
    Users.find({ signinID: signinID} && {password: password})
        .then(data => {
            if (!data)
                res.status(404).send({ message: " User not found with signInID " + signinID})
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with signInID=" + signinID})
        });
}


// Find all Users with the specified password in the request
exports.findByPassword = (req, res) => {
    const password = req.params.password;
    Users.find({ password: password})
        .then(data => {
            if (!data)
                res.status(404).send({ message: " User not found with password " + password})
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with password=" + password})
        });
}

// Find all Users with the specified doctorFirstName in the request
exports.findByDoctorFirstName = (req, res) => {
    const doctorFirstName = req.params.doctorFirstName;
    Users.find({ doctorFirstName: doctorFirstName})
        .then(data => {
            if (!data)
                res.status(404).send({ message: " User not found with doctorFirstName " + doctorFirstName})
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with doctorFirstName=" + doctorFirstName})
        });
}

// Find all Users with the specified doctorLastName in the request
exports.findByDoctorLastName = (req, res) => {
    const doctorLastName = req.params.doctorLastName;
    Users.find({ doctorLastName: doctorLastName})
        .then(data => {
            if (!data)
                res.status(404).send({ message: " User not found with doctorLastName " + doctorLastName})
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with doctorLastName=" + doctorLastName})
        });
}

/* - want to implement
exports.findByLastSignIn = (req,res) => {
    //Users are assigned a variable for the dateTime when the last Signed in. you can then find Users by a range of dateTime to see when ppl signed in
}*/