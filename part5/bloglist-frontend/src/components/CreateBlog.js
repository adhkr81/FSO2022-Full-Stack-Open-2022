import { useState } from "react"
import PropTypes from 'prop-types'

const CreateBlog = ({handleCreate, newBlog, setNewBlog}) => {


  const handleChange = (e) => {
    setNewBlog({...newBlog, [e.target.name] : e.target.value})
  } 



return (

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

    )
}

CreateBlog.propTypes = {
    handleCreate: PropTypes.func.isRequired
  }


export default CreateBlog