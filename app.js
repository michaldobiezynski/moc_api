const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

mongoose
  .connect(
    `mongodb+srv://michal123:michal123@devconnector-6tf9d.mongodb.net/MiloOfCroton?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
    console.log("API started");
  })
  .catch((err) => {
    console.log(err);
  });
