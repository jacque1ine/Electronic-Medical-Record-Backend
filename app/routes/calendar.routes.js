module.exports = app => {
    const calendar = require("../controllers/calendar.controller.js");
    var router = require("express").Router();
    router.post("/", calendar.create);
    router.get("/", calendar.findAll);
    router.get("/:id", calendar.findOne);
    router.put("/:id", calendar.update);
    router.delete("/:id", calendar.delete);
    app.use('/api/calendar', router);
 };
 