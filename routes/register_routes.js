const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('landingPage')
})

router.post('/register', function (req, res) {
  let newUser = new User({
    name: req.body.name,
    email: req.body.username,
    password: req.body.password

  })

  newUser.save()
  .then(user=>{
    res.redirect(`/profile/${user.slug}`)
  })
})

router.post("/login", (req,res)=>{
  User.findOne({email: req.body.email})
  .then(user => {
      if(!user) { // if the result returned from findOne is null, means there were no records where the email matched the form email
        console.log("Email not found")
        return res.redirect("/landingPage")
      }
      // if you can find the email, compare the password
      var comparisonObj ={
        hash: user.password,
        formPassword : req.body.email
      }
      // res.send(comparisonObj)
      // compare "admin.password"<(from form) against password in the database
      user.validPassword(req.body.password, (err, output)=>{
        if (! output){
          console.log("Comparison failed")
          return res.redirect("/landingPage")
        }
        console.log("Comparison Success!");
        res.redirect("/")
      })
  })
  // res.send(req.body)
})


module.exports = router
