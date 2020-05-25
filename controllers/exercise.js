const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const Exercise = require("../models/Exercise");
const HttpError = require("../models/Http-error");

exports.createExercise = async (req, res, next) => {
  console.log("I was called");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422),
    );
  }

  const { name, description, type, musclesWorked } = req.body;

  const createdExercise = new Exercise({
    name,
    description,
    type,
    musclesWorked,
  });

  createdExercise.save(function (err) {
    if (err) {
      const error = new HttpError(
        "Creating exercise failed, please try again.",
        500,
      );
      return next(error);
    }
    res.status(201).json({ exercise: createdExercise });
  });
};
