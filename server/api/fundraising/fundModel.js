const mongoose = require("mongoose");

const fundSchema = new mongoose.Schema({
    tittle: {
        type: String,
        required: true,
        default: ""
    },
    description: {
        type: String,
        required: true,
        default: ""
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    collectedAmount: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    donors: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            donationAmount: {
                type: Number,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const Fund = mongoose.models.Fund || mongoose.model("Fund", fundSchema);
module.exports = Fund;
