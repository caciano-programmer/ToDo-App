/**
 * Created by Caciano on 3/6/2017.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");
mongoose.Promise = global.Promise;

const userSchema = new Schema
({
    email: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true, unique: false}
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);