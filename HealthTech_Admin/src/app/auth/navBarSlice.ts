import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   showNav:false,
}

export const navBarSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        showNavBar:  (state) => {
            state.showNav = true
        },
        hideNavBar:  (state) => {
            state.showNav = false
        },
    },
})


// Action creators are generated for each case reducer function
export const { showNavBar,hideNavBar } = navBarSlice.actions

export default navBarSlice.reducer