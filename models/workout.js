const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  date: { type: Date, required: true },
  timeGoal: { type: Number, required: true },
  repsGoal: { type: Boolean, required: true },
  sets: [{ type: mongoose.Types.ObjectId, required: true, ref: "Set" }],
  time: { type: Number, required: true },
  exercises: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Exercise" },
  ],
  user: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
});

module.exports = mongoose.model("Workout", workoutSchema);
