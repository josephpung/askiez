const express = require("express")
const router = express.Router()

const User = require('../models/user')

router.get('/:slug', (req, res) => {
  User.findOne({slug: req.params.slug})
  .then(user => {
    res.send(user)
  })
})

module.exports = router
