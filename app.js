// Main starting point of the application
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db/db");

const app = express();

// Connect Database
connectDB();

// App Setup
app.use(cors());
app.use(express.json({ extended: false }));

// Define Routes
app.get("/", (req, res) => res.send("API Running"));

app.use(require("./routes/users"));
app.use("/api/workouts", require("./routes/workout"));
app.use("/api/template", require("./routes/template"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
