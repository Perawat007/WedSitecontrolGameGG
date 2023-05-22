import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCustomer, getCommissionMonthly } from 'services/CrmService'

export const getCryptoDashboardData = createAsyncThunk(
    'comDashboard/data/getCryptoDashboardData',
    async (data) => {
        const response = await getCommissionMonthly(data)
        console.log(response);
        return response
    }
)

const dataSlice = createSlice({
    name: 'comDashboard/data',
    initialState: {
        loadingAll: true,
        dashboardData: {},
    },
    reducers: {},
    extraReducers: {
        [getCryptoDashboardData.fulfilled]: (state, action) => {
            state.loadingAll = false
            state.dashboardData = action.payload
        },
        [getCryptoDashboardData.pending]: (state) => {
            state.loadingAll = true
        },
    },
})

export default dataSlice.reducer
