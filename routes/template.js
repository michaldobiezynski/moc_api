const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const moment = require("moment");

const auth = require("../middleware/auth");
const Template = require("../models/Template");
const User = require("../models/User");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const templates = await Template.find({ userId: req.user.id });

    res.json(templates);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", auth, async (req, res) => {
  const { name, userId, exercises } = req.body;

  const date = req.body.date ? req.body.date : moment().format("DD/MM/YYYY");

  try {
    const template = new Template({
      name,
      date,
      exercises,
      userId: req.user.id,
    });
    await template.save();
    res.send(template);
  } catch (error) {
    return res.status(422).send({ error: error.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  const { name, userId, date, exercises } = req.body;

  try {
    let template = await Template.findById(req.params.id);

    template.name = name;
    template.exercises = exercises;
    template.date = date;

    await template.save();

    res.json(template);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Errors");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ msg: "Template not found" });
    }

    // Check user
    if (template.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await template.remove();

    res.json({ msg: "Template removed" });
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Template not found" });
    }

    res.status(500).send("Server Errors");
  }
});

module.exports = router;
