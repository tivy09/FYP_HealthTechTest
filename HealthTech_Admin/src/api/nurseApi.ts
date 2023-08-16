import axios from "../utils/axios/AxiosHandlers"

export const nurseAPI = {
  //get all Nurse
  getAllNurse: async () => {
    return await axios.get(`/admin/nurses`)
  },
  //add new Nurse
  addNewNurse: async (payload:any) => {
    return await axios.post(`/admin/nurses`,payload)
  },
  //get Nurse detail
  getNurseDetail: async (id:any) => {
    return await axios.get(`/admin/nurses/${id}`)
  },
  //update Nurse detail
  updateNurseDetail: async (id:any,payload:any) => {
    return await axios.put(`/admin/nurses/${id}`,payload)
  },
  //change nurse status
  changeNurseStatus: async (id:any) => {
    return await axios.post(`/admin/active-nurse/${id}`)
  },
}