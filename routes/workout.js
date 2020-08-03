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

router.put("/:id", auth, async (req, res) => {
  const { date, timeLimit, repsGoal, sets, time, totalWeightLifted } = req.body;

  let miliSec = Date.parse(date);
  try {
    let workout = await Workout.findById(req.params.id);

    workout.date = miliSec;
    workout.timeLimit = timeLimit;
    workout.repsGoal = repsGoal;
    workout.time = time;
    workout.totalWeightLifted = totalWeightLifted;
    workout.date = miliSec;

    await workout.save();

    res.json(workout);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Errors");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ msg: "Workout not found" });
    }

    // Check user
    if (workout.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await workout.remove();

    res.json({ msg: "Workout removed" });
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Workout not found" });
    }

    res.status(500).send("Server Errors");
  }
});

module.exports = router;
