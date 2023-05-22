import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apAddAgent,
    apiGetCrmCustomersStatistic,
    apPutAgent,
    apiGetAgent,
    apPutDeleteAgent,
    editPasswordSubAgent
} from 'services/CrmService'
import { useSelector } from 'react-redux'
import AlertError from 'views/AlertError'

export const getCustomerStatistic = createAsyncThunk(
    'crmCustomers/data/getCustomerStatistic',
    async () => {
        const response = await apiGetCrmCustomersStatistic()
        return response.data
    }
)

export const getCustomers = createAsyncThunk(
    'crmCustomers/data/getCustomers',
    async (params) => {
        console.log(params);
        const response = await apiGetAgent(params)
        return response
    }
)

export const putCustomer = createAsyncThunk(
    'crmCustomers/data/putCustomer',
    async (data) => {
        const response = await apPutAgent(data)
        return response.data
    }
)
export const editPasswordSub = createAsyncThunk(
    'crmCustomers/data/putCustomer',
    async (data) => {
        const response = await editPasswordSubAgent(data)
        if (response.message === "Can't find this password") {
            alert("รหัสผ่านไม่ถูก กรุณาตรวจสอบรหัสผ่าน และลองใหม่อีกครั้ง");
        }
        else {
            window.location.href ="/home";
            return response.data
        }
    }
)

export const AddCustomer = createAsyncThunk(
    'crmCustomers/data/AddCustomer',
    async (data) => {
        const response = await apAddAgent(data)
        if (response.message === "Data Creates False") {
            alert("UserName นี้มีอยู่แล้ว กรุณาเปลี่ยน Username");
        }
        else {
            window.location.reload();
        }
    }
)

export const DeleteAgent = createAsyncThunk(
    'crmCustomers/data/DeleteAgent',
    async (data) => {

        const response = await apPutDeleteAgent(data, 'agent')
        return response.data
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
    name: 'crmCustomers/data',
    initialState: {
        loading: false,
        customerList: [],
        statisticData: {},
        tableData: initialTableData,
        filterData: initialFilterData,
    },
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setCustomerList: (state, action) => {
            state.customerList = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
    },
    extraReducers: {
        [getCustomers.fulfilled]: (state, action) => {
            state.customerList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getCustomers.pending]: (state) => {
            state.loading = true
        },
        [getCustomerStatistic.pending]: (state) => {
            state.statisticLoading = true
        },
        [getCustomerStatistic.fulfilled]: (state, action) => {
            state.statisticData = action.payload
            state.statisticLoading = false
        },
    },
})

export const { setTableData, setCustomerList, setFilterData } =
    dataSlice.actions

export default dataSlice.reducer
