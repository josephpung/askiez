const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  console.log(user);
  next();
})

const User = mongoose.model('User', userSchema)

// make this available to our other files
module.exports = User
