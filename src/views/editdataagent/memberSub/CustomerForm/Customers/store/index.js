import { combineReducers } from '@reduxjs/toolkit'
import state from './stateSlice'
import addAgent from './addSlice'
import data from './dataSliceAdmin'

const reducer = combineReducers({
    addAgent,
    state,
    data,
})

export default reducer