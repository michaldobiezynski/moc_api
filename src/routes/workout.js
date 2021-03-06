const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const auth = require("../middleware/auth");
const Workout = require("../models/Workout");
const User = require("../models/user");
const Template = require("../models/Template");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const workouts = await Workout.find({ userId: req.user.id });

    res.json(workouts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/latest", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const lastWorkoutOfUser = await Workout.findOne({
      userId: req.user.id,
    }).sort({ date: -1 });

    res.json(lastWorkoutOfUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
router.get("/byDate", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const workouts = await Workout.find({
      userId: req.user.id,
      date: { $gte: req.body.startDate, $lte: req.body.endDate },
    });

    res.json(workouts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", auth, async (req, res) => {
  const {
    templateId,
    date,
    timeLimit,
    weightGoal,
    sets,
    timeUsed,
    totalWeightLifted,
  } = req.body;

  try {
    const workout = new Workout({
      date,
      timeLimit,
      weightGoal,
      sets,
      timeUsed,
      totalWeightLifted,
      userId: req.user.id,
      templateId,
    });

    if (
      !req.user.bestWorkout ||
      workout.totalWeightLifted > req.user.bestWorkout.totalWeightLifted
    ) {
      let template = await Template.findById(workout.templateId);

      req.user.bestWorkout = {
        templatedUsed: template.name,
        totalWeightLifted: workout.totalWeightLifted,
        weightGoal: workout.weightGoal,
        date: workout.date,
        timeUsed: workout.timeUsed,
        timeLimit: workout.timeLimit,
      };
    }

    let tempDate = workout.date;
    workout.sets.forEach((element) => {
      if (
        !req.user.bestSet ||
        element.weight * element.reps >
          req.user.bestSet.weight * req.user.bestSet.reps
      ) {
        req.user.bestSet = {
          name: element.name,
          weight: element.weight,
          reps: element.reps,
          date: tempDate,
        };
      }
    });

    await req.user.save();
    await workout.save();

    res.send(workout);
  } catch (error) {
    return res.status(422).send({ error: error.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  const {
    templateId,
    date,
    timeLimit,
    weightGoal,
    sets,
    timeUsed,
    totalWeightLifted,
  } = req.body;

  try {
    let workout = await Workout.findById(req.params.id);

    workout.templateId = templateId;
    workout.date = date;
    workout.timeLimit = timeLimit;
    workout.weightGoal = weightGoal;
    workout.sets = sets;
    workout.timeUsed = timeUsed;
    workout.totalWeightLifted = totalWeightLifted;

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
