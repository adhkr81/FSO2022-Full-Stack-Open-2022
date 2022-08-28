const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blogs'
    }
  ],
})


const User = mongoose.model('User', userSchema)

module.exports = User