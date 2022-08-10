module.exports = app => {
    const notes = require("../controllers/notes.controller.js");
    var router = require("express").Router();

    // Create a new note
    router.post("/", notes.create);

    // Retrieve all notes
    router.get("/", notes.findAll);

    // Retrieve a single note with id
    router.get("/:id", notes.findOne);

    // Update a note with id
    router.put("/:id", notes.update);

    // Delete a note with id
    router.delete("/:id", notes.delete);

    // Delete all notes
    router.delete("/", notes.deleteAll);

    // Retrieve all notes with specified patientHCNumber
    router.get("/patientHCNumber/:patientHCNumber", notes.findByPatientHCNumber);

    // Retrieve all notes with specified doctorID
    router.get("/doctorID/:doctorID", notes.findByDoctorID);


    app.use('/api/notes', router);
};