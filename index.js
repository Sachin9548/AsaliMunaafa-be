const express = require("express");
const errorHandler = require("errorhandler");
const logger = require("morgan");
const cors = require("cors");
const { error } = require("./utils/helper");
const { MongoDBconnect } = require("./library/mongodb");
const mainRouter = require("./routes/v1");
const session = require("express-session");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(errorHandler());
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));

// const path = require('path');
// app.get('/html', (req, res) => {
//   res.sendFile(path.join(__dirname, 'google.html'));
// });

app.use(mainRouter);
app.use(error);


if(process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/dist"));
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
  });
}


//DB Connection
const PORT = process.env.PORT || 8080;
MongoDBconnect()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error Connecting Mongodb", error);
  });
