const express = require("express")
const router = express.Router()

const Thread = require('../models/threads')

router.get('/', (req, res) => {
  Thread.find({}, function (err, data) {
    if (err) {
      console.log(err)
      return
    }
    res.render('home', {
      title: 'Questions In DB',
      threads: data

    })
  }).sort({totalVotes: -1})
})

module.exports = router
