const exphbs = require('express-handlebars')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const quoteApiKey = process.env.QUOTEAPI
const dbUrl =
process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/project'
const port = process.env.PORT || 5000
const app = express()

require("dotenv").config({silent: true})


// console.log(`this is the key: ${quoteApiKey}`)
const mongoose = require('mongoose')
mongoose.connect(dbUrl , {
  useMongoClient: true
})
mongoose.Promise = global.Promise //allows us to use .then


// Setting up Sessions AFTER connecting to mongoose
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true, //saves session and stores it in DB
  store: new MongoStore({ mongooseConnection: mongoose.connection }) // store it in MongoDB, this requires mongo-connect to work
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
 // set port to be env if not configured

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


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
