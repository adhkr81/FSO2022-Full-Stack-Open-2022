
const Blog = ({blog, handleDelete}) => {


return (
  <div>
      {blog.title} - Likes {blog.likes} <button id={blog._id} onClick={handleDelete}>remove</button>
  </div>  
)
}
export default Blog