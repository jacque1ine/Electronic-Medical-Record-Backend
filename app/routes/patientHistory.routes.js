module.exports = app => {
    const pHist = require("../controllers/patientHistory.controller.js");
    var router = require("express").Router();
    router.post("/", pHist.create);
    router.get("/", pHist.findAll);
    router.get("/:patientHCNumber", pHist.findbyHC);
    router.put("/:patientHCNumber", pHist.updatebyHC);
    router.delete("/:patientHCNumber", pHist.delete);
    app.use('/api/patientHistory', router);
};
 