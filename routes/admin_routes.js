const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')



const Admin = require('../models/admin')
const adminCode = "2424"

router.get('/', (req, res) => {
  res.render('admin',{
    title: "======= Admin Console ======="
  })
})

router.post("/login", (req,res)=>{
  Admin.findOne({email: req.body.email})
  .then(admin => {
      if(!admin) return res.redirect("/admin")
      // if you can find the email, compare the password
      var comparisonObj ={
        hash: admin.password,
        formPassword : req.body.email
      }
      // res.send(comparisonObj)
      // compare "admin.password"<(from form) against password in the database
      admin.validPassword(req.body.password, (err, output)=>{
        if (! output){
          console.log("Comparison failed")
          return res.redirect("/admin")
        }
        console.log("Comparison Success!");
        res.redirect("/")
      })
  })
  // res.send(req.body)
})



router.post('/register', function (req, res) {
  if(req.body.admin_code !== adminCode) return res.redirect("/error")

  let newAdmin = new Admin({
    name: req.body.name,
    email: req.body.username,
    password: req.body.password,
    adminCode: req.body.admin_code

  })

  newAdmin.save()
  .then(output =>{
    console.log("admin saved", output);
  })
  // debug code (output request body)
  res.render('admin', {
    title: 'Database Updated!'
  })
})

module.exports = router
