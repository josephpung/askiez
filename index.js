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

const User = require('./models/user')
// const Thread = require('./models/threads')
// const Admin = require('./models/admin')

//require all route files
const register_routes = require("./routes/register_routes")
const question_routes = require("./routes/question_routes")
const home = require("./routes/home")
const admin_routes = require("./routes/admin_routes")
const thread = require("./routes/thread")
const answer_routes = require("./routes/answer_routes")
const profile_routes = require("./routes/profile_routes")
const vote_routes = require("./routes/vote_routes")
// ==================================[]================================== //

// Setting up hbs
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))

// testing connection



app.use("/addQuestions",question_routes)
app.use("/landingPage",register_routes)
app.use("/", home)
app.use("/admin", admin_routes)
app.use("/thread", thread)
app.use("/addAnswer", answer_routes)
app.use("/profile", profile_routes)
app.use("/vote", vote_routes)


app.get("/error", (err, res)=>{
  res.render("admin_error")
})

app.get("/search", (err,res)=>{
  res.render("search",{
    title: "Search Page"
  })
})

app.post("/search", (req, res)=>{
  // res.send(req.body.keyword)

  const keyword = req.body.keyword

  User.find({
    name: new RegExp(keyword, "i")
  })
  .then(results=>{
    res.send(results)
  })
})
// ================== Testing mongoose user creation and find


app.listen(5000, () => {
  console.log(`Server is running on port 5000`)
})
