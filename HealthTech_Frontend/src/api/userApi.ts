import axios from "../utils/axios/AxiosHandlers"

export const userAPI = {
  updateUserInfo: async (payload:any) => {
    return await axios.post(`/admin/update-userInfo`,payload)
  },                                   
  checkOldPassword: async (payload:any) => {
    return await axios.post(`/admin/check-oldPassword`,{old_password:payload})
  },    
  updatePassword: async (payload:any) => {
    return await axios.post(`/admin/update-password`,{password:payload})
  },    
  getInfoDetail: async () => {
    return await axios.get(`/admin/get-userInfo`)
  },    
}