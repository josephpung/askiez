const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a schema
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: {type: String},
  answer: {type: Array, default : []},
  questions: {type: Array, default : []}
})

const User = mongoose.model('User', userSchema)

// make this available to our other files
module.exports = User
