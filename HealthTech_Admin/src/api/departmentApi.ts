import axios from "../utils/axios/AxiosHandlers"
import { PatientData } from "../utils/types/types"

export const departmentAPI = {
  //get all department
  getAllDepartment: async () => {
    return await axios.get(`/admin/departments`)
  },
  //add new department
  addNewDepartment: async (payload:any) => {
    return await axios.post(`/admin/departments`,payload)
  },
  //get department detail
  getDepartmentDetail: async (id:number|string) => {
    return await axios.get(`/admin/departments/${id}`)
  },
  //update detail
  updateDepartmentDetail: async (id:number|string,payload:any) => {
    return await axios.put(`/admin/departments/${id}`,payload)
  },
  
}