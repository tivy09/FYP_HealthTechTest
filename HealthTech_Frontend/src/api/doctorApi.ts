import axios from "../utils/axios/AxiosHandlers"

export const doctorApi = {
  getAllDepartment: async () => {
    return await axios.get(`/admin/getDepartmentList`)
  },//no token
  getDepartmentDoctor: async (id:any) => {
    return await axios.get(`/admin/getDoctorsList/${id}`)
  },//no token
  getAllDoctor: async () => {
    return await axios.get(`/admin/doctors`)
  }
}