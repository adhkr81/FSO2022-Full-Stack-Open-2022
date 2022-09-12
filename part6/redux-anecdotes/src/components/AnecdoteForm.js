import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'

import { addNew } from '../reducers/anecdotesSlice'


export function AnecdoteForm () {

    const dispatch = useDispatch()


    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.name.value
        dispatch(addNew(content))
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