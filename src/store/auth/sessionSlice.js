import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
    name: 'auth/session',
    initialState: {
        token: '',
        aunt: [],
        signedIn: false,
    },

    reducers: {
        onSignInSuccess: (state, action) => {
            /*fetch('http://localhost:5000/post/token', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${action.payload}`,
                'Content-Type': 'application/json'
            }
            })
            .then(response => response.json())
            .then(data => {
                const access = data.data;
                console.log(access);
              })
            .catch(error => console.error(error));*/
            state.signedIn = true
            state.token = action.payload
        },
        onSignOutSuccess: (state) => {
            state.signedIn = false
            localStorage.removeItem("token")
            localStorage.removeItem("admin")
            state.token = ''
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
    },
})

export const { onSignInSuccess, onSignOutSuccess, setToken } =
    sessionSlice.actions

export default sessionSlice.reducer
