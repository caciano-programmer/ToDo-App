/**
 * Created by Caciano on 3/6/2017.
 */

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const eventSchema = new Schema
({
    user: {type: Schema.ObjectId, required: true, ref: "User"},
    event: {type: String, required: true},
    details: {type: String, required: true},
    hour: {type: String, required: true},
    minutes: {type: String, required: true},
    am_pm: {type: String, required: true},
    month: {type: String, required: true},
    day: {type: String, required: true},
    year: {type: String, required: true},
});

module.exports = mongoose.model("Events", eventSchema);