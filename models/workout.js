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
  weight: { type: Number, required },
  additionalWeight: { type: Number, required },
  reps: { type: Number, required },
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
    set.exercises.forEach((exercise) => {
      if (exercise.type === "bodyweight") {
        let bodyWeightExercise = bodyWeightExercises.find(
          (exe) => exe.name === exercise.name
        );
        calculatedWeight =
          calculatedWeight +
          (exercise.additionalWeight +
            exercise.weight * bodyWeightExercise.percantageOfBodyWeightUsed) *
            exercise.reps;
      } else {
        calculatedWeight = calculatedWeight + exercise.weight;
      }
    });
  });

  this.totalWeightLifted = calculatedWeight.toFixed(2);
  console.log(this.totalWeightLifted);
  next();
});

module.exports = mongoose.model("Workout", workoutSchema);
