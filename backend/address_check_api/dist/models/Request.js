"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Status;
(function (Status) {
    Status["PENDING"] = "Pending";
    Status["CONFIRMED"] = "Confirmed";
    Status["REJECTED"] = "Rejected";
    Status["PROCESSING"] = "Processing";
    Status["MISSING_INFO"] = "Missing Info";
})(Status || (Status = {}));
const requestSchema = new Schema({
    proof: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.PENDING,
    },
    lastApprovalDate: {
        type: Date,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Request", requestSchema);
