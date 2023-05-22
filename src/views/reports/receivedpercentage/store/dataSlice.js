import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {getCustomer} from 'services/CrmService'

export const getcommissionDashboardData = createAsyncThunk(
    'commissionDashboard/data/getCrmDashboardData',
    async (data) => {
        const response = await getCustomer(data)
        return response
    }
)

export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'commissionDashboard/data',
    initialState: {
        commissionloading: true,
        commissionData: {},
    },
    reducers: {},
    extraReducers: {
        [getcommissionDashboardData.fulfilled]: (state, action) => {
            state.commissionData = action.payload
            state.commissionloading = false
        },
        [getcommissionDashboardData.pending]: (state) => {
            state.commissionloading = true
        },
    },
})

export default dataSlice.reducer
