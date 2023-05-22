import { createSlice } from '@reduxjs/toolkit'

const addSlice = createSlice({
    name: 'crmCustomers/addAgent',
    initialState: {
        drawerOpen: false,
    },
    reducers: {
        setDrawerOpen: (addAgent) => {
            addAgent.drawerOpen = true
        },
        setDrawerClose: (addAgent) => {
            addAgent.drawerOpen = false
        },
    },
})
export const {
    setDrawerOpen,
    setDrawerClose,
} = addSlice.actions

export default addSlice.reducer;