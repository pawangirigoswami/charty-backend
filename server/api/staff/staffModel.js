const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:"",
        trim:true
    },
    email:{
        type:String,
        required:true,
        default:"",
        unique:true
    },
    password:{
        type:String,
        required:true,
   
    },
    role:{
      type:String,
      enum:["staff","manager","supervisor"],
      default:"staff"
    },
    address:{
        type:String,
        default:""
    },
    employeeId:{
        type:String,
        unique:true
    },
    joiningDate:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    },
    
})

const Staff = mongoose.models.Staff || mongoose.model("Staff",staffSchema)
module.exports = Staff