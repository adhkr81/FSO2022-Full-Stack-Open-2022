const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")

const api = supertest(app)

test("GET route and JSON tests - exercise 4.8", async () => {
    await api.get("/api/blogs")
        .expect(200)
        .expect('Content-Type', /application\/json/)
})


test("The unique identifier property is named id - exercise 4.9*", async () => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
  })


test("POST route test - exercise 4.10", async () => {
    const newPost = {
        title: "test",
        author: "test",
        url: "test",
        likes: 50
    }
    
    await api.post("/api/blogs")
        .send(newPost)
        .expect(201)
})

test('If likes, title or url are missing, respond with 400 bad request - exercises 4.11*, 4.12*', async () => {
    const newBlog = {
      author:"Adriano",
      likes: 15
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  }, 90000)




