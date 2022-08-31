const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    url: {type: String, required: true},
    likes: {type: Number},
    users: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
  })


  module.exports = mongoose.model('Blog', blogSchema)