import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    editSubAgent,
    apiPercentageGameSubAgent,
    apPutDeleteAgent,
    editPercentSubAgent
} from 'services/CrmService'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const getGame = createAsyncThunk(
    'editPreCentGame/data/getProducts',
    async (data) => {
        const response = await apiPercentageGameSubAgent(data)
        return response
    }
)

export const updateProduct = async (data) => {
    const response = await editSubAgent(data)
    return response.data
}

export const updatePercent= async (data) => {
    const response = await editPercentSubAgent(data)
    return response
}

export const deleteProduct = async (data) => {
    const response = await apPutDeleteAgent(data)
    return response.data
}

const dataSlice = createSlice({
    name: 'editPreCentGame/data',
    initialState: {
        loading: false,
        productData: [],
    },
    reducers: {},
    extraReducers: {
        [getGame.fulfilled]: (state, action) => {
            state.productData = action.payload
            state.loading = false
        },
        [getGame.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer
