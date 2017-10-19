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
app.get("/addQuestions",(req,res)=>{
  res.render("addquestions")
})

app.get("/landingPage", (req,res)=>{

  res.render('landingPage')
})

app.get("/", (req,res)=>{
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
  console.log(`Server is running on port 5000`)
})

app.get(`/questions/:id`, (req, res) => {

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

app.post('/landingPage', function (req, res) {

  let newUser = new User({
    name: req.body.name,
    email: req.body.username,
    password: req.body.password

  })

  newUser.save()
  .then(output => {
    displayResults(output.ops)
  })
  .catch(err=>{
    console.log(err);
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
/////////////////////////////////////

app.post("/upvote", function(req, res){


  var inc = parseFloat(req.body.current)
  console.log(inc,"CurrentNumIndex.js");
   res.setHeader("Content-Type", "application/json");
   inc += parseFloat(req.body.changeBy);
   res.send(JSON.stringify(inc))
   console.log(req.body)
   Thread.findByIdAndUpdate(req.body.obj, { $set: { totalVotes: inc }}, (err, output)=> {
  if (err) console.log(err);
    console.log(output);
});

})
app.post("/downvote", function(req, res){


  var dec = parseFloat(req.body.current)
   res.setHeader("Content-Type", "application/json");
   dec -= parseFloat(req.body.changeBy);
   res.send(JSON.stringify(dec))
   console.log(req.body)
   Thread.findByIdAndUpdate(req.body.obj, { $set: { totalVotes: dec }}, (err, output)=> {
  if (err) console.log(err);
    console.log(output);
});

})

 function findVotes(id){
   Thread.findById(id,(err, result)=>{
     if (err){
       console.log(err);
     }
     return result.totalVotes


   })
 }
/////////////////////////////////////

app.post('/addQuestions', function (req, res) {

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
  res.render('questions', {
    title: 'Database Updated!' + (parseInt(req.body.question)+1)
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
