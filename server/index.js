const express = require("express")
const app = express()
const config = require("config")
const dbConnection = require("./startup/db.js")
app.use(express.json())
// we use this express.json middlewre because when data comes in req  like or event if we recive json data from frontend still its a raw string for express which express will not be able to understand so express.json convert that string into usable object.
// let myObj ={
//     name:"Abhinav",
//     work:"sofware devloper"
// }
// if we will log this without parsing with middleware then it will give us undefined
require("./startup/cors.js")(app)
require("./startup/route.js")(app)
const PORT = config.get("port")
const startServer = () =>{
try {
    dbConnection()
    app.listen(PORT)
    console.log(`Server sucessfully running in port number ${PORT}`)
} catch (error) {
    console.log(`Server failed to run on port number ${PORT}`)
}
}

startServer()