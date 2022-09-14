import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const postNew = async (element) => {
    const object =  {
        content: element,
        votes: 0
      }

    const response = await axios.post(baseUrl, object)
    console.log(response.data)
    return response.data
}

const update = async objectToUpdate => {
    const response = await axios.put(`${baseUrl}/${objectToUpdate.id}`, objectToUpdate)
    return response.data
  }





export default { getAll, postNew, update }