import { createSlice } from '@reduxjs/toolkit'
import { removeToken } from '../../utils/capacitor/CapacitorStore';
import { Storage } from '@capacitor/storage'
const initialState = {
    username:"",
    phone_number:"",
    email:"",
    password:"",
    is_active: "",
    token:"",
    is_auth:false,
    type:""
}
export async function getToken(key: string) {
    const ret = await Storage.get({ key: key })
    return ret.value
}
export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        saveUserData:  (state, action) => {
            // const user_data = JSON.parse(action.payload)
            const user_data = action.payload
            state.username = user_data.user.username;
            state.phone_number = user_data.user.phone_number;
            state.email = user_data.user.email;
            state.password = user_data.password;
            state.token = user_data.token;
            state.type=user_data.type;
            if(getToken('C') !== null){
                state.is_auth = true;
            }
        },
        logout:(state) => {
            removeToken('Token')
            state.token = '';
            state.is_auth = false;
        },
    },
})


// Action creators are generated for each case reducer function
export const { saveUserData,logout } = authSlice.actions

export default authSlice.reducer