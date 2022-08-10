module.exports = app => {
    const users = require("../controllers/users.controller.js");
    var router = require("express").Router();

    // Create a new user
    router.post("/", users.create);

    // Retrieve all users
    router.get("/", users.findAll);

    // Retrieve a single user with id
    router.get("/:id", users.findOne);

    // Update a user with id
    router.put("/:id", users.update);

    // Delete a user with id
    router.delete("/:id", users.delete);

    // Delete all users
    router.delete("/", users.deleteAll);

    // Retrieve all users with specified doctorID
    router.get("/doctorID/:doctorID", users.findByDoctorID);
    router.get("/isAdmin/:isAdmin")

    // Retrieve all users with specified signinID and password
    router.get("/:signinID/:password", users.findBySignInID);

    // Retrieve all users with specified password
    router.get("/password/:password", users.findByPassword);

    // Retrieve all users with specified doctorFirstName
    router.get("/doctorFirstName/:doctorFirstName", users.findByDoctorFirstName);

    // Retrieve all users with specified doctorLastName
    router.get("/doctorLastName/:doctorLastName", users.findByDoctorLastName);    

    app.use('/api/users', router);
};