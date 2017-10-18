const exphbs = require('express-handlebars')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/project', {
  useMongoClient: true
})
mongoose.Promise = global.Promise

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const User = require('./models/user');
const Thread = require('./models/threads');

// ==================================[]================================== //

// Setting up hbs
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))


//testing connection
app.get("/", (req,res)=>{

  res.send("testing")
})
app.get("/questions",(req,res)=>{
  res.render("questions")
})

app.get("/landingPage", (req,res)=>{

  res.render('landingPage')
})

app.get("/home", (req,res)=>{
  Thread.find({}, function (err, data) {
    if (err) {
      console.log(err)
      return;
    }
    res.render('home',{
      title: "Questions In DB",
      threads : data

    })
  })

})



app.listen(5000, () => {
  console.log(`Server is running on port 4000`)
})

app.get(`/:id`, (req, res) => {

  Thread.findById({_id: req.params.id}, function (err, thread) {
    if (err) {
      console.log(err)
      return;
    }
    console.log("=====");
    console.log(thread)
    res.render("thread", {
      data: thread

    })
  })


})

app.post('/registeruser', function (req, res) {

  let newUser = new User({
    email: req.body.username,
    password: req.body.password

  })

  newUser.save()
  .then(output => {
    displayResults(output.ops)
  })
  // debug code (output request body)
  res.render('landingPage', {
    title: 'Database Updated!'
  })
})

app.post('/addAnswer', function (req,res) {
  console.log(req.body);
  // res.send(req.body.userinput)
  // Thread.find({_id: req.body._id})
  Thread.findById(req.body.id, (err, result)=> {
    if (err) {
      console.log(err)
      return;
    }

    result.answer.push({answer: req.body.userinput})
    console.log(result);
    result.save()
  })
})


app.post('/addQuestions', function (req, res) {

  let newQues = new Thread({
    question: req.body.question,
    description: req.body.description

  })
  console.log(req.body);
  newQues.save()
  .then(output => {
    displayResults(output.ops)

  })
  // debug code (output request body)
  res.render('questions', {
    title: 'Database Updated!' + req.body
  })
})

// ================== Testing mongoose user creation and find



// //save the user
// newUser.save(function (err) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('User created!');
// })
User.find({}, function (err, users) {
  if (err) {
    console.log(err)
    return;
  }
  console.log(users)
})
