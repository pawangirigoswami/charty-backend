const mongoose = require("mongoose")

const donorSchema = new mongoose.Schema({
    appointmentfor:{
        type:String,
        required:true,
        default:""
    },
    reasonforappointment:{
        type:String,
        required:true,
        default:""
    },
    appointmentdate:{
        type:Date,
        required:true

    },
    appointmenttime:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["approved","reject","pending"],
        default:"pending"
    }

})

const Donor = mongoose.models.Donor || mongoose.model("Donor",donorSchema)

module.exports = Donor