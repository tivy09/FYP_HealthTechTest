import { createSlice } from '@reduxjs/toolkit'
import { removeToken } from '../../utils/capacitor/CapacitorStore';
import { Storage } from '@capacitor/storage'
const initialState = {
    id:0,
    username:"",
    phone_number:"",
    email:"",
    password:"",
    is_active: "",
    token:"",
    is_auth:false,
    type:"",
    first_name:'',
    last_name:'',
    department_id:0,
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
            console.log(action.payload)
            // const user_data = JSON.parse(action.payload)
            const user_data = action.payload
            state.id=user_data.user.id;
            state.username = user_data.user.username;
            state.first_name = user_data.user.first_name;
            state.last_name = user_data.user.last_name;
            state.phone_number = user_data.user.phone_number;
            state.email = user_data.user.email;
            state.password = user_data.password;
            state.token = user_data.token;
            state.type=user_data.user.type;
            if(user_data.user.type === '4'){
                state.department_id=user_data.user.department_id
            }
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