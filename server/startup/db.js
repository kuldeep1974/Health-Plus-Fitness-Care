const mongoose = require("mongoose")
const config = require("config")
const db_URL = config.get("db_URL")

// mongoose.connect(db_URL).then(()=>console.log(`Database sucessfully connected to ${db_URL}`))
// .catch(()=>console.log(`Database failed to connect to ${db_URL}`))
mongoose.set("debug",true) // so this is basically used rto console every opertaion happening inside mongoose. for example like when we use ay method or function like find add or anything .
const dbConnection = () =>{
    try {
    mongoose.connect(db_URL)
    console.log(`Database failed to connect to ${db_URL}`)
    } catch (error) {
        console.log(`Database failed to connect to ${db_URL}`)
    }
}
module.exports = dbConnection;