import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {getCustomer} from 'services/CrmService'

export const getSalesDashboardData = createAsyncThunk(
    'salesDashboard/data/getSalesDashboardData',
    async (data) => {
        const response = await getCustomer()
        return response
    }
)

export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'salesDashboard/data',
    initialState: {
        loading: true,
        dashboardData:[],
    },
    reducers: {},
    extraReducers: {
        [getSalesDashboardData.fulfilled]: (state, action) => {
            state.dashboardData = action.payload
            state.loading = false
        },
        [getSalesDashboardData.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer
