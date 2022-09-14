import { useDispatch } from 'react-redux'

import { addNew } from '../reducers/anecdotesSlice'
import { createNewAnecdotes } from '../reducers/anecdotesSlice'


export function AnecdoteForm () {

    const dispatch = useDispatch()


    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.name.value
        dispatch(createNewAnecdotes(content))
        event.target.name.value = ""
      }

return (
    <>
    <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="name"/></div>
        <button type="submit">create</button>
      </form>
    </>
)
}