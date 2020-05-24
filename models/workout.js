const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  date: { type: Date, required: true },
  timeGoal: { type: Number, required: true },
  repsGoal: { type: Boolean, required: true },
  description: { type: String, required: true },

  address: { type: String, required: true },
  exercises: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Exercise" },
  ],
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Place", placeSchema);
