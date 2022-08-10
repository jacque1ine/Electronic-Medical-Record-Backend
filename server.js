const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptions = {
   origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./app/models");
db.mongoose
   .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
   .then(() => {
      console.log("Connected to the database!");
   })
   .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
   });

require("./app/routes/tutorial.routes")(app);
require("./app/routes/calendar.routes")(app);
require("./app/routes/labRecords.routes")(app);
require("./app/routes/notes.routes")(app);
require("./app/routes/patientHistory.routes")(app);
require("./app/routes/patients.routes")(app);
require("./app/routes/users.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
   app.use(express.static(__dirname+'/dist/'));
   app.get('*', (req,res) => {
      res.sendFile(__dirname+'/dist/index.html')
   })
}

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}.`);
});