import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { addVoteSlice } from "../reducers/anecdotesSlice"


export function AnecdoteList () {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.sliceTest)
    console.log(anecdotes)

    const vote = (id) => {
        console.log('vote', id)
        dispatch(addVoteSlice(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
    )
}