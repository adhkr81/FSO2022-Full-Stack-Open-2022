import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
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
    {
      title : "",
      author : "",
      url : ""
    }
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

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleChange = (e) => {
    setNewBlog({...newBlog, [e.target.name] : e.target.value})
  } 

  const handleCreate = async (e) => {
    e.preventDefault()
    
    try {
      blogService.create(newBlog)    
      setNewBlog({ title : "", author : "", url : ""})
      setMessage("`Blog was successfully added`")
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
          <p>{user.username} logged in <button onClick={handleLogout}>log out</button></p>
    
          <form onSubmit={handleCreate}>
            <div>
              <label>Title: </label>
              <input onChange={handleChange} name="title"/>
            </div>
            <div>
              <label>Author: </label>
              <input onChange={handleChange} name="author"/>
            </div>
            <div>
              <label>Url: </label>
              <input onChange={handleChange} name="url"/>
            </div>
            <div>
              <button type="submit">add</button>
            </div>
          </form>
    
          <br/>
         
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>)}

    </div>   
  )
}

export default App
