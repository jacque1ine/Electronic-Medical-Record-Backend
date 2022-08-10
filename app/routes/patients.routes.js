module.exports = app => {
    const patient = require("../controllers/patients.controller.js");
    var router = require("express").Router();
    router.post("/", patient.create);
    router.get("/", patient.findAll);
    router.get("/:HCNumber", patient.findbyHC);
    router.put("/:HCNumber", patient.updatebyHC);
    router.delete("/:HCNumber", patient.delete);
    router.put("/:HCNumber/:presc", patient.addSinglePrescription);
    app.use('/api/patient', router);
};
 