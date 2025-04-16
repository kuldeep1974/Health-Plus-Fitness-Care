const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
    bodyProblem: {
      type: String,
      required: true,
    },
    exercises: [
      {
        name: { type: String, required: true },
        description: { type: String, default: "" },
        duration: { type: Number, default: 0 },
        type: {
          type: String,
          enum: ["aerobic", "strength", "flexibility", "balance", "endurance"],
          default: "aerobic",
        },
        intensity: {
          type: String,
          enum: ["low", "medium", "high"],
          default: "medium",
        },
        equipment: { type: String, default: "" },
        repetitions: { type: Number, default: 0 },
        sets: { type: Number, default: 0 },
        caloriesBurned: { type: Number, default: 0 },
      }
    ]
  }, { strict: true }); // Add this line
  
const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
