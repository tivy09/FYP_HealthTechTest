import axios from "../utils/axios/AxiosHandlers"

export const authAPI = {
  loginUser: async (payload:any) => {
      return await axios.post(`/users/user-login`,payload)
  },
    registerUser: async (payload:any) => {
      return await axios.post(`/users/user-register`,{data:payload})
  },
}