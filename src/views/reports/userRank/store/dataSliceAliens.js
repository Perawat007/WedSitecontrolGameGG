import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAgent } from 'services/CrmService'

export const getAgCrmDashboardData = createAsyncThunk(
    'crmDashboard/dataAliens/getAgCrmDashboardData',
    async (params) => {
        const response = await apiGetAgent(params)
        return response
    }
)

export const initialTableDataAliens = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterDataAliens = {
    status: '',
}

const dataSliceAliens = createSlice({
    name: 'crmDashboard/dataAliens',
    initialState: {
        loadingAliens : false,
        customerListAliens : [],
        dashboardDataAliens : {},
        tableDataAliens : initialTableDataAliens,
        filterDataAliens : initialFilterDataAliens,
    },
    reducers: {
        setTableDataAliens: (state, action) => {
            state.tableDataAliens  = action.payload
        },
        setCustomerListAliens: (state, action) => {
            state.customerListAliens  = action.payload
        },
        setFilterDataAliens: (state, action) => {
            state.filterDataAliens  = action.payload
        },
    },
    extraReducers: {
        [getAgCrmDashboardData.fulfilled]: (state, action) => {
            state.customerListAliens = action.payload.data //ใช้ Search ข้อมูล
            state.dashboardDataAliens = action.payload
            state.tableDataAliens.total = action.payload.total
            state.loadingAliens = false
        },
        [getAgCrmDashboardData.pending]: (state) => {
            state.loadingAliens  = true
        },
    },
})

export const { setTableDataAliens, setCustomerListAliens, setFilterDataAliens } =
    dataSliceAliens.actions

export default dataSliceAliens.reducer
