const express = require("express")
const router = express.Router()

const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('landingPage')
})

router.post('/', function (req, res) {
  let newUser = new User({
    name: req.body.name,
    email: req.body.username,
    password: req.body.password

  })

  newUser.save()
  .then(user=>{
    res.redirect(`/profile/${user.slug}`)
  })

  // debug code (output request body)
  // res.render('landingPage', {
  //   title: 'Database Updated!'
  // })
})


module.exports = router
