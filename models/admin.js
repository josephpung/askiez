const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')


const adminSchema = new Schema({
  name: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: {type: String},
  adminCode: {type: String}
})


adminSchema.pre("save", function(next){

  var admin = this

  // if (!user.isModified('password')) return next();

  //hash the password
  bcrypt.hash(admin.password, 10)
  .then(hash =>{
    console.log(`the hash is ${hash}, password is ${admin.password}`)
    admin.password = hash
      next();
  })

  // Override the cleartext password with the hashed one
  console.log("Pre save flow", admin);

})

adminSchema.methods.validPassword = function(plainPassword, callback) {
  // Compare is a bcrypt method that will return a boolean,
  bcrypt.compare(plainPassword, this.password, callback)
}



const Admin = mongoose.model('Admin', adminSchema)

// make this available to our other files
module.exports = Admin
