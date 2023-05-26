import { createSlice } from '@reduxjs/toolkit'

const addSlice = createSlice({
    name: 'crmMemSubAgent/addAgent',
    initialState: {
        drawerOpen: false,
    },
    reducers: {
        setDrawerOpen: (addMenBer) => {
            addMenBer.drawerOpen = true
        },
        setDrawerClose: (addMenBer) => {
            addMenBer.drawerOpen = false
        },
    },
})
export const {
    setDrawerOpen,
    setDrawerClose,
} = addSlice.actions

export default addSlice.reducer;