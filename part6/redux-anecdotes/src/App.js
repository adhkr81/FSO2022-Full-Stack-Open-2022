import { AnecdoteForm } from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdotList'
import  Notification  from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdotesSlice'

import { useDispatch } from 'react-redux'
import { useEffect } from 'react'


const App = () => {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App