import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

//PREPARE TOKEN FROM APP.JS USEEFFECT TO ADD ON HEADER
function setToken(newToken) {
  token = `bearer ${newToken}`
}


//GET ALL
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

//CREATE POST
const create = async newObject => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}





export default { getAll, create, setToken }