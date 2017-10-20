const express = require("express")
const router = express.Router()

const Thread = require('../models/threads')

router.get(`/:id`, (req, res) => {
  Thread.findById({_id: req.params.id}, function (err, thread) {
    if (err) {
      console.log(err)
      return
    }
    res.render('thread', {
      data: thread

    })
  })
})

module.exports = router
