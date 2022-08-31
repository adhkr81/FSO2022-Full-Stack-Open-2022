const blogRouter = require("express").Router()
const Blog = require("../models/Blog")
const User = require("../models/User")
const jwt = require("jsonwebtoken")


  
// POST NEW BLOG  
blogRouter.post('/', async (request, response) => {

    console.log(request.body)

    const body = request.body
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid"})
    }
    const user = await User.findById(decodedToken.id)

    if (!body.title || !body.url) {
      console.log(body.title)
      console.log(body.url)
      return response.status(400).json()
    }


    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      users: user._id
    })

    try { 
      result = await blog.save()
      return response.status(201).json(result)
    } catch (error) {
      console.log(error)
      return response.status(400)
    }
  })


// GET ALL
blogRouter.get('/', (request, response) => {
  Blog
    .find({}).populate("users").then(blogs => {
      response.json(blogs)
    })
})  

//DELETE POST
blogRouter.delete("/delete/:id", async (request, response) => {

  const { id } = request.params

  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid"})
  }


  try {
    const deleted = await Blog.findOneAndDelete({_id: id})
    return response.status(205).json({message: "successfully deleted"})

  } catch(error) {
    console.log(error)
    return response.status(500).json()
  }
})

//UPDATE POST
blogRouter.patch("/update/:id", async (request, response) => {
  const { id } = request.params
  const body = request.body

  console.log(body)
  console.log(id)

  try {
    const updated = await Blog.findOneAndUpdate(
      {_id: id},
      { ...body },
      { new: true, runValidators: true})

    return response.status(200).json(updated)

  } catch(error) {
    console.log(error)
    return response.status(500).json()
  }
})

//LIKE BUTTON PUT
blogRouter.put("/:id", async (request, response) => {
  const { id } = request.params
  const body = request.body

  try {
    const updated = await Blog.findOneAndUpdate(
      {_id: id},
      { ...body },
      { new: true, runValidators: true})
    
    return response.status(200).json(updated)

  } catch (error) {
    console.log(error)
    return response.status(500).json()
  }

})



  module.exports = blogRouter