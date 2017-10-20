const express = require("express")
const router = express.Router()

const Thread = require('../models/threads')

router.post('/', function (req, res) {
  console.log(req.body)
  Thread.findById(req.body.id, (err, result) => {
    if (err) {
      console.log(err)
      return
    }

    result.answer.push({answer: req.body.userinput, author: req.body.id})
    result.save()
  })
  res.redirect(`/thread/${req.body.id}`)
})

module.exports = router
