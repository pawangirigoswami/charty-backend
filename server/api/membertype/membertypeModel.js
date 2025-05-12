const mongoose = require("mongoose");

const membertypeSchema = new mongoose.Schema({
    memberType: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
});

const MemberType = mongoose.models.MemberType || mongoose.model("MemberType", membertypeSchema);

module.exports = MemberType;
