import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
const stateSlice = createSlice({
    name: 'dailyDashboard/state',
    initialState: {
        startDate: dayjs().subtract(3, 'month').toDate(),
        endDate: new Date(),
        tradeDialogOpen: false,
    },
    reducers: {
        toggleTradeDialog: (state, action) => {
            state.tradeDialogOpen = action.payload
        },
        setStartDate: (state, action) => {
            state.startDate = action.payload
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload
        },
    },
})

export const { toggleTradeDialog } = stateSlice.actions

export default stateSlice.reducer
