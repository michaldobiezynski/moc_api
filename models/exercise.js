const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String },
  musclesWorked: [String],
  weight: { type: Number, required: true },
});

module.exports = mongoose.model("Workout", workoutSchema);
