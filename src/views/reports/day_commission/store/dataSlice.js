import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAgent, 
apiGetCrmMember,
 } 
from 'services/CrmService'

export const getCryptoDashboardData = createAsyncThunk(
    'cryptoDashboard/data/getCryptoDashboardData',
    async (data) => {
        const response = await apiGetAgent(data)
        return response
    }
)
export const getTransctionHistoryData = createAsyncThunk(
    'cryptoDashboard/data/getCryptoDashboardData',
    async (params) => {
        const response = await apiGetAgent(params)
        return response
    }
)
export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    status: '',
}

const dataSlice = createSlice({
    name: 'crmDashboard/data',
    initialState: {
        loading: false,
        customerList: [],
        dashboardData: {},
        transactionHistoryLoading: true,
        transactionHistoryData: [],
        tableData: initialTableData,
        filterData: initialFilterData,
        selectedTab: 'Go_Gold',
    },
    reducers: {
        setSelectedTab: (state, action) => {
            state.selectedTab = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setCustomerList: (state, action) => {
            state.customerList = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        setTransactionHistoryData: (state, action) => {
            state.transactionHistoryData = action.payload
        },
    },
    extraReducers: {
        [getCryptoDashboardData.fulfilled]: (state, action) => {
            state.customerList = action.payload.data //ใช้ Search ข้อมูล
            state.dashboardData = action.payload
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getTransctionHistoryData.fulfilled]: (state, action) => {
            state.transactionHistoryLoading = false
            state.tableData.total = action.payload.total
            state.transactionHistoryData = action.payload.data;
        },
        [getCryptoDashboardData.pending]: (state) => {
            state.loading = true
        },
    },
})

export const {setTransactionHistoryData, setSelectedTab ,setTableData, setCustomerList, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer