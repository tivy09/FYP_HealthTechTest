import axios from "../utils/axios/AxiosHandlers"
import { updateStatusPayload } from "../utils/types/types"

export const appointmentAPI = {
  getAllDepartment: async () => {
    return await axios.get(`/admin/getDepartmentList`)
  },
  getDepartmentDoctor: async (id:any) => {
    return await axios.get(`/admin/getDoctorsList/${id}`)
  },
  addAppointment: async (data:any) => {//1552
    return await axios.post(`/admin/addAppointment`, data)
  },
  getDoctorAppointment: async (id:any) => {
    return await axios.get(`/admin/get-AppointmentListByDoctorID/${id}`)
  },
  getAppointmentDetail: async (id:any) => {
    return await axios.get(`/admin/appointments/${id}`)
  },
  getDepartmentAppointment: async (id:any) => {
    return await axios.get(`/admin/get-AppointmentListByDepartment/${id}`)
  },
  updateAppointmentStatus: async (payload:updateStatusPayload) => {
    return await axios.post(`/admin/update-status`,payload)
  },
}