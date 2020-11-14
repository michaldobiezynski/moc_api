const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const setSchema = new Schema({
  exerciseName: { type: String },
  weight: { type: Number },
  reps: { type: Number },
});

const workoutSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Template",
  },
  sets: [setSchema],
  date: { type: Date },
  timeUsed: { type: Number },
  timeLimit: { type: Number },
  weightGoal: { type: Number },
  totalWeightLifted: { type: Number },
});

module.exports = mongoose.model("Workout", workoutSchema);
