import { useDispatch, useSelector } from "react-redux"

import { addNewVote } from "../reducers/anecdotesSlice"
import { showVote, clearDisplay } from '../reducers/notificationSlice'

// REDUCER WITHOUT TOOLKIT
// import { addVote } from "../reducers/anecdoteReducer"


export function AnecdoteList () {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.sliceTest)
    console.log(anecdotes)

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(addNewVote(anecdote))
        dispatch(showVote(anecdote.content))
        setTimeout(() => {dispatch(clearDisplay(anecdote.content))}, 5000)
      }

    return (
    <>
      {/* {anecdotes.sort((a, b) => b.votes - a.votes) */}
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
    )
}