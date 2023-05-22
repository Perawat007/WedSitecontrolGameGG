import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apAddAgent,
    apiGetCrmCustomersStatistic,
    editSubAgent,
    apiGetSubAgent,
    apPutDeleteAgent,
    editPasswordSubAgent
} from 'services/CrmService'
import { useSelector } from 'react-redux'
import AlertError from 'views/AlertError'

export const getSubAgent = createAsyncThunk(
    'salesProductEdit/data/getProducts',
    async (data) => {
        const response = await apiGetSubAgent(data)
        return response.data
    }
)

export const updateProduct = async (data) => {
    const response = await editSubAgent(data)
    return response.data
}

export const deleteProduct = async (data) => {
    const response = await apPutDeleteAgent(data)
    return response.data
}

const dataSlice = createSlice({
    name: 'salesProductEdit/data',
    initialState: {
        loading: false,
        productData: [],
    },
    reducers: {},
    extraReducers: {
        [getSubAgent.fulfilled]: (state, action) => {
            state.productData = action.payload
            state.loading = false
        },
        [getSubAgent.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer
