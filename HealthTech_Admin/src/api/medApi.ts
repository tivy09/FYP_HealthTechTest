import axios from "../utils/axios/AxiosHandlers"

export const medAPI = {
  getMedicineList: async () => {
    return await axios.get(`/admin/medicines`)
  },
  addNewMedicine: async (payload:any) => {
    return await axios.post(`/admin/medicines`,payload)
  },
  getMedicineDetail: async (id:any) => {
    return await axios.get(`/admin/medicines/${id}`)
  },
  deleteMedicine: async (id:number) => {
    return await axios.delete(`/admin/medicines/${id}`)
  },
  updateMedicine: async (id:number,payload:any) => {
    return await axios.put(`/admin/medicines/${id}`,payload)
  },
  changeMedicineStatus: async (id:number)=>{
    return await axios.put(`/admin/active-medicine/${id}`)
  }
}