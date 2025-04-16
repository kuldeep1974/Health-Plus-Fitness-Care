const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise.js');
const mongoose = require("mongoose");

mongoose.set("debug", true); // MongoDB query logging

router.post('/', async (req, res) => {
  try {
    const { bodyProblem, exercises } = req.body;

    // console.log("Incoming Request Body:", JSON.stringify(req.body, null, 2));

    if (!bodyProblem || !Array.isArray(exercises) || exercises.length === 0) {
      return res.status(400).json({ message: 'bodyProblem and exercises are required' });
    }

    let doc = await Exercise.findOne({ bodyProblem });

    if (doc) {
      doc.exercises.push(...exercises);
      await doc.save();
    } else {
      doc = await Exercise.create({ bodyProblem, exercises });
    }

    console.log(" Saved Document:", JSON.stringify(doc, null, 2));

    res.status(201).json({ message: 'Exercises saved successfully', data: doc });
  } catch (err) {
    console.error(" Error Saving Exercises:", err);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
});

module.exports = router;
