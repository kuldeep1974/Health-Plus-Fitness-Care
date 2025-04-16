const user = require("../routes/user.js")
const exercise = require("../routes/exercise.js")
module.exports = function (app){
    app.use("/api/user",user)
    app.use('/api/exercise', exercise);
}