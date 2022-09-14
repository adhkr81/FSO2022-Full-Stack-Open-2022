import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showVote (state, action) {
           return state = `You voted on " ${action.payload} "`
        } ,

        clearDisplay (state) {
            return state = ""
        }
    }
})

export default notificationSlice.reducer

export const { showVote, clearDisplay } = notificationSlice.actions