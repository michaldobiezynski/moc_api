const mongoose = require("mongoose");

const bodyWeightExercises = [
  { name: "press up", percantageOfBodyWeightUsed: 0.64 },
  { name: "pull up", percantageOfBodyWeightUsed: 1 },
  { name: "chin up", percantageOfBodyWeightUsed: 1 },
];

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: { type: String },
  description: { type: String },
  type: { type: String },
  musclesWorked: [String],
  weight: { type: Number },
  reps: { type: Number },
});

const setSchema = new Schema({
  exercises: [exerciseSchema],
});

const workoutSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: { type: String },
  timeLimit: { type: Number },
  repsGoal: { type: Number },
  sets: [setSchema],
  time: { type: Number },
  totalWeightLifted: { type: Number },
});

workoutSchema.pre("save", function (next) {
  let calculatedWeight = 0;
  this.sets.forEach((set) => {
    console.log(set);
    set.exercises.forEach((exercise) => {
      console.log(exercise);
      if (exercise.type === "bodyweight") {
        let bodyWeightExercise = bodyWeightExercises.find(
          (exe) => exe.name === exercise.name
        );
        calculatedWeight =
          calculatedWeight +
          exercise.weight * bodyWeightExercise.percantageOfBodyWeightUsed;
        console.log(calculatedWeight);
      } else {
        calculatedWeight = calculatedWeight + exercise.weight;
      }
    });
  });

  // this.totalWeightLifted = (
  //   (this.totalRight / this.totalAttempts) *
  //   100
  // ).toFixed(2);
  next();
});

module.exports = mongoose.model("Workout", workoutSchema);
