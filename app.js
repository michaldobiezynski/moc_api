// Main starting point of the application
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(bodyParser.json());

// App Setup
app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));
router(app);

// DB Setup
mongoose
  .connect(
    `mongodb+srv://michal123:michal123@devconnector-6tf9d.mongodb.net/MiloOfCroton?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => {
    console.log("MongoDB connected");

    // Server Setup
    const port = process.env.PORT || 5000;
    const server = http.createServer(app);
    server.listen(port);
    console.log("Server listening on:", port);
  })
  .catch((err) => {
    console.log(err);
  });
