import axios from "../utils/axios/AxiosHandlers"
import { PatientData } from "../utils/types/types"

export const doctorAPI = {
  //get all doctor
  getAllDoctor: async () => {
    return await axios.get(`/admin/doctors`)
  },
  //add new doctor
  addNewDoctor: async (payload:any) => {
    return await axios.post(`/admin/doctors`,payload)
  },
  //get doctor detail
  getDoctorDetail: async (id:any) => {
    return await axios.get(`/admin/doctors/${id}`)
  },
  //update doctor detail
  updateDoctorDetail: async (id:any,payload:any) => {
    return await axios.put(`/admin/doctors/${id}`,payload)
  },
  // change doctor status
  changeDoctorStatus: async (id:any)=>{
    return await axios.post(`/admin/active-doctor/${id}`)
  }
}