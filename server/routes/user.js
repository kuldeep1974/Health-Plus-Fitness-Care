
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const mongoose = require("mongoose");
const { User, validateUserRegister,validateUserLogin } = require("../models/user.js");

mongoose.set("debug", true); 

router.post("/", async (req, res) => {
  try {
    const { error } = validateUserRegister(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: "Validation Error",
        error: { message: error.details[0].message }
      });
    }

    const { email, password } = req.body;

    const emailLc = email.toLowerCase();

    const existingUser = await User.findOne({ email: emailLc });
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        message: "Conflict",
        error: { message: "Email already registered!" }
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ ...req.body, email: emailLc, password: hashedPassword });

    const token = user.getUserAuthentication();

    await user.save();

    const responseData = _.pick(user, [
      "_id",
      "firstName",
      "lastName",
      "userName",
      "email",
      "role"
    ]);

    return res.status(201).json({
      status: 201,
      message: "Success",
      success: {
        message: "User successfully registered.",
        data: responseData,
        token 
      }
    });

  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: { message: "Something went wrong while registering user." }
    });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { error } = validateUserLogin(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: "Validation Error",
        error: { message: error.details[0].message },
      });
    }

    const { email, password } = req.body;
    const emailLc = email.toLowerCase(); 

    const userExist = await User.findOne({ email: emailLc });
    if (!userExist) {
      return res.status(400).json({
        status: 400,
        message: "Login Failed",
        error: { message: "Invalid email or password" },
      });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: 400,
        message: "Login Failed",
        error: { message: "Invalid email or password" },
      });
    }

    const token = userExist.getUserAuthentication();

    const userData = _.pick(userExist, [
      "_id",
      "firstName",
      "lastName",
      "userName",
      "email",
      "role"
    ]);

    return res.status(200).json({
      status: 200,
      message: "Login Successful",
      success: {
        data: userData,
        token
      }
    });

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: { message: "Something went wrong during login." },
    });
  }
});


module.exports = router;

