const express = require("express")
const router = express.Router()


const Thread = require('../models/threads')


router.get('/', (req, res) => {
  res.render('addquestions')
})

router.post('/', function (req, res) {
  let newQues = new Thread({
    question: req.body.question,
    description: req.body.description

  })

  // console.log(req.body);
  newQues.save()
  .then(output => {
    displayResults(output.ops)
  })
  // debug code (output request body)
  res.render('addquestions', {
    title: 'Database Updated!' + (parseInt(req.body.question) + 1)
  })
})

module.exports = router
