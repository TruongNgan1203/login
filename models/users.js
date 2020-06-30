const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    age: Number,
    address: String
});

var User = mongoose.model("Users", userSchema);

module.exports = User;