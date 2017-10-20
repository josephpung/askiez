// const mongoose = require('mongoose')
// const Schema = mongoose.Schema
//
// // create a schema
// const threadSchema = new Schema({
//   question: { type: String, required: true},
//   description: {type: String, required: true},
//   upVotes: {type: Number, default: 0},
//   downVotes: {type: Number, default: 0},
//   totalVotes: {type: Number, default: 0},
//   creator_id: {type: String, default: "anonymous"}
//
// })
// const Thread = mongoose.model('threads', threadSchema)

// make this available to our other files
// module.exports = Thread
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a children schemas
const answerSchema = new mongoose.Schema({
  answer: { type: String, required: true },
  upvotes: { type: Number, default: 0},
  downvotes: { type: Number },
  author: { type: Schema.Types.ObjectId, ref: 'Thread'}
})
// create parent schema
const threadSchema = new mongoose.Schema({
  question: { type: String, required: true },
  description: { type: String, required: true },
  answer: [ answerSchema ],
  totalVotes : {type: Number, default: 0},
  upVotes: { type: Number, default: 0},
  downVotes: { type: Number, default: 0},
  creator: { type: String, default: "anonymous"}
})


const Thread = mongoose.model('threads', threadSchema)

// make this available to our other files
module.exports = Thread
