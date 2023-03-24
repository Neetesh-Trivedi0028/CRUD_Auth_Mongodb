const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userschema = mongoose.Schema({
   name: {
      type: String,
      required: [true, "A user must have a name"]
   },
   email: {
      type: String,
     // unique: true,
      required: [true, "Please provide an email!"],
      lowercase: true,
      validator: [validator.isEmail, "Please provide a valid email"]
   },
   password: {
      type: String,
      required: [true, "Please provide a Password!"],
      select:false
   },
   age: {
      type: Number,
      required: [true, "Please provide age"]
   },
   gender: {
      type: String,
      required: [true, "A user must have a gender"]
   },

});

userschema.pre('save',async function(next){
   this.password = await bcrypt.hash(this.password,12);
   next();
});
userschema.methods.correctPassword= async function (condidatePassword, userPassword){
   return await bcrypt.compare(condidatePassword,userPassword);
};

const User = mongoose.model('User', userschema);
module.exports = User;