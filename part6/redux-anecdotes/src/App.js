import { AnecdoteForm } from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdotList'
import  Notification  from './components/Notification'

const App = () => {


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