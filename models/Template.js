const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: { type: String },
  description: { type: String },
  weight: { type: Number },
});

const templateSchema = new Schema({
  name: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: { type: Date },
  exercises: [exerciseSchema],
});

module.exports = mongoose.model("Template", templateSchema);
