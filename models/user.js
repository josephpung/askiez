const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

// create a schema
const userSchema = new Schema({
  name: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: {type: String},
  slug: {type: String},
  answer: {type: Array, default : []},
  questions: {type: Array, default : []}
})


userSchema.pre("save", function(next){

  var user = this

  user.slug = user.name.toLowerCase().split(" ").join("-")
  // if (!user.isModified('password')) return next();

  //hash the password
  bcrypt.hash(user.password, 10)
  .then(hash =>{
    console.log(`the hash is ${hash}, password is ${user.password}`)
    user.password = hash
    next()

  })

  // Override the cleartext password with the hashed one
  // console.log("Pre save flow", user);
})

userSchema.methods.validPassword = function(plainPassword, callback) {
  // Compare is a bcrypt method that will return a boolean,
  bcrypt.compare(plainPassword, this.password, callback)
}

const User = mongoose.model('User', userSchema)

// make this available to our other files
module.exports = User
