const express = require("express");
const Workout = require("../models/Workout");
const Template = require("../models/Template");
const User = require("../models/User");
const auth = require("../middleware/auth");
const {
  sendContactUsEmail,
  sendWelcomeEmail,
  sendDeleteEmail,
  sendPasswordResetCode,
} = require("../emails/account");

const router = new express.Router();

router.post("/contactUs", auth, async (req, res) => {
  try {
    // sendContactUsEmail(req.body.email, req.body.content);

    res.status(200).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/loginWithCode", async (req, res) => {
  try {
    const user = await User.findByEmailAndPasswordCode(
      req.body.email,
      req.body.passwordResetCode
    );
    const token = await user.generateTempAuthToken();
    await user.generatePasswordResetCode();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/passwordReset", async (req, res) => {
  try {
    const user = await User.findByEmail(req.body.email);

    if (!user) {
      res.status(200).send();
    }

    const passwordResetCode = await user.generatePasswordResetCode();

    // sendPasswordResetCode(user.email, user.name, passwordResetCode);
    res.status(200).send();
    setTimeout(async () => {
      await user.generatePasswordResetCode();
    }, 600000);
  } catch (error) {
    res.status(200).send();
  }
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    // sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  const userId = req.params.id;

  try {
    const user = req.user;

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res.send(user);
  } catch (error) {
    res.status(400).send();
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new Error();
    }

    res.send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  const userId = req.user._id;
  try {
    await req.user.remove();
    await Template.deleteMany({ userId: userId });
    await Workout.deleteMany({ userId: userId });
    // sendDeleteEmail(req.user.email, req.user.name);

    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

router.delete("/users/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
