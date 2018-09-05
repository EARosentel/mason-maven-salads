var mongoose = require("mongoose");
var passportLocalMon = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMon);

module.exports= mongoose.model("User", userSchema);