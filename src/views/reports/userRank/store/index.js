import { combineReducers } from '@reduxjs/toolkit'
import data from './dataSlice'
import dataAliens from './dataSliceAliens'
import state from './stateSlice'

const reducer = combineReducers({
    data,
    state,
    dataAliens,
})

export default reducer
