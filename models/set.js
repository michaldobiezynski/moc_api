const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const setSchema = new Schema({
  exercise: { type: mongoose.Types.ObjectId, required: true, ref: "Exercise" },
  reps: { type: Number, required: true },
  weightPerRep: { type: Number, required: true },
  additionalWeightPerRep: { type: Number, required: true },
  totalWeightLiftedInThisSet: { type: Number, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
});

module.exports = mongoose.model("Set", setSchema);
