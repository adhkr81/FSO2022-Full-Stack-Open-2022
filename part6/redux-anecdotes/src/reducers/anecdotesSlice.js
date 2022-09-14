import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotesRoutes'

const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
const getId = () => (100000 * Math.random()).toFixed(0)
  
const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }
  
const initialState = anecdotesAtStart.map(asObject)




const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {

        addNew (state, action) {
            state.push(action.payload)
        },

        addVoteSlice (state, action) {
            const id = action.payload.id
            const anecdoteToChange = state.find(n => n.id === id)
            const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes +1}
            
            return state.map(current => current.id !== id ? current : changedAnecdote)
        },

        setAnecdotes(state, action) {
          return action.payload
        },

    },
})





export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdotes = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.postNew(content)
    console.log(anecdote)
    dispatch(addNew(anecdote))
  }
}

export const addNewVote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.update(content)
    dispatch(addVoteSlice(anecdote))
  }
}



export const { addNew, addVoteSlice, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

