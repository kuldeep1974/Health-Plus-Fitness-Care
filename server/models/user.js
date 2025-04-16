const mongoose = require("mongoose")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const config = require("config")
const userSchema = new mongoose.Schema({
    firstName:{type:String,trim:true},
    lastName:{type:String,trim:true},
    userName:{type:String,trim:true},
    email:{type:String,trim:true},
    password:{type:String,trim:true},
    role:{type:String,enum:["user","admin"],default:"user"},
})

const jwtToken = config.get("jwtSecreteKey")

userSchema.methods.getUserAuthentication = function () {
    return jwt.sign(
      {
        userId: this._id,
        email: this.email,
        role: this.role
      },
      jwtToken,
      {
        expiresIn: "30d"
      }
    );
  };
  

const User = mongoose.model("user",userSchema)

const validateUserRegister = (reqData) => {
    const Schema = new Joi.object({
firstName:Joi.string().min(3).max(10).required(),
lastName:Joi.string().min(3).max(10).required(true),
userName:Joi.string().min(4).max(10).required(),
email:Joi.string().required(),
password:Joi.string().min(6).max(20).required()
    })
   return Schema.validate(reqData)
}

const validateUserLogin = (reqData) => {
    const Schema = Joi.object({
        email:Joi.string().required(),
        password:Joi.string().required()
    })

    return Schema.validate(reqData)
}

module.exports = {User,validateUserRegister,validateUserLogin};
