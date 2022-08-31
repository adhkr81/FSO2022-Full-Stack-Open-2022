import { useState, useEffect } from 'react'

//COMPONENTS
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

//SERVICES
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('')
  const [newBlog, setNewBlog] = useState(
    {title : "", author : "", url : ""}
    )



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
      } 
    
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

//LOGIN ROUTE
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setMessage("Wrong credentials")
      setColor('red')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

//CREATE NEW BLOG ROUTE
  const handleCreate = async (e) => {
    e.preventDefault()
    
    try {
      blogService.create(newBlog)    
      setNewBlog({ title : "", author : "", url : ""})
      setMessage("Blog was successfully added")
      setColor('green')
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch {
        setMessage("Cannot add blog")
        setColor('red')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    }
  }

//DELETE BLOG
  const handleDelete = async (event) => {
    let blogId = event.target.id

    try {
      blogService.deleteBlog(blogId)
      setMessage("Blog was successfully deleted")
      setColor('green')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error)
      setMessage("Cannot delete blog")
      setColor('red')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
}

//LOGOUT 
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }





  return (
    <div>
        <Notification message={message} color={color}/>

        {user === null ? (
                <>
                  <h2>Log in to application</h2>
                  <form onSubmit={handleLogin}>
                  <div>
                    username
                      <input
                      type="text"
                      value={username}
                      name="Username"
                      onChange={({ target }) => setUsername(target.value)}
                    />
                  </div>
                  <div>
                    password
                      <input
                      type="password"
                      value={password}
                      name="Password"
                      onChange={({ target }) => setPassword(target.value)}
                    />
                  </div>
                  <button type="submit">login</button>
                </form>
              </>

        ) : (
        
        <div>
          <h2>blogs</h2>
          <p>{user.username} logged in 
              <button onClick={handleLogout}>log out</button>
          </p>
          
          <Togglable buttonLabel="new blog">
              <CreateBlog handleCreate={handleCreate} newBlog={newBlog} setNewBlog={setNewBlog}/>
          </Togglable>
          <br/>
         
          {blogs
            .sort((a, b) => a.likes - b.likes)
            .map(blog =>
              <Blog key={blog.id} blog={blog} handleDelete={handleDelete}/>
          )}
        </div>)}

    </div>   
  )
}

export default App
