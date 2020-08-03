const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const auth = require("../middleware/auth");
const Workout = require("../models/Workout");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const workouts = await Workout.find({ userId: req.user.id });
    // workouts.forEach((work) => {
    //   let readableDate = new Date(parseInt(work.date));
    //   work.date = readableDate;
    // });
    res.json(workouts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", auth, async (req, res) => {
  const { date, timeLimit, repsGoal, sets, time, totalWeightLifted } = req.body;

  let miliSec = Date.parse(date);

  try {
    const workout = new Workout({
      date: miliSec,
      timeLimit,
      repsGoal,
      sets,
      time,
      totalWeightLifted,
      userId: req.user.id,
    });
    await workout.save();
    res.send(workout);
  } catch (error) {
    return res.status(422).send({ error: error.message });
  }
});

module.exports = router;
