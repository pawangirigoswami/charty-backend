const mongoose = require("mongoose")
require("dotenv").config()

const createDatabaseConnection = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB Connect Successfully")

    }catch(err){
       console.log("MongoDB Connection Failed:",err.message)
       process.exit(1)
    }

}

module.exports = createDatabaseConnection