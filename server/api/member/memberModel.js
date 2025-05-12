const mongoose = require("mongoose")

const memberSchema = new mongoose.Schema({
    membertype:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"MemberType"
    },
    name:{
        type:String,
        required:true,
        default:""
    },
    image:{
        type:String,
        default:"",
        required:true
    },
    address:{
        type:String,
        default:"",
        required:true
    },
    contact:{
        type:String,
        required:true,
        default:""
    },
    addressProof:{
        type:String,
        required:true,
        default:""
    },
    idProof:{
        type:String,
        required:true,
        default:""
    },
    description:{
        type:String,
        required:true,
        default:""
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Member = mongoose.models.Member || mongoose.model("Member",memberSchema)
module.exports = Member