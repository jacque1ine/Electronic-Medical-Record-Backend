module.exports = app => {
    const labRecords = require("../controllers/labRecords.controller.js");
    var router = require("express").Router();

    // Create a new labRecord
    router.post("/", labRecords.create);

    // Retrieve all labRecords
    router.get("/", labRecords.findAll);

    // Retrieve a single labRecord with id
    router.get("/:id", labRecords.findOne);

    // Update a labRecord with id
    router.put("/:id", labRecords.update);

    // Delete a labRecord with id
    router.delete("/:id", labRecords.delete);

    // Delete all labRecords
    router.delete("/", labRecords.deleteAll);

    // Retrieve all labRecords with specified patientHCNumber
    router.get("/patientHCNumber/:patientHCNumber ", labRecords.findByPatientHCNumber );

    // Retrieve all labRecords with specified dateIssued
    router.get("/dateIssued/:dateIssued", labRecords.findByDateIssued);

    
    app.use('/api/labRecords', router);
};