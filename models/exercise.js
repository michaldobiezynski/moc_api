const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String },
  musclesWorked: [String],
  percentageOfBodyWeight: { type: Number },
});

module.exports = mongoose.model("Exercise", exerciseSchema);
