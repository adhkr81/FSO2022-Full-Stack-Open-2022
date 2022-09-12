import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationSlice'
import anecdoteSlice from './reducers/anecdotesSlice'

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer : {
               anecdotes: anecdoteReducer,
               notification: notificationReducer,
               sliceTest: anecdoteSlice
              }
})



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

