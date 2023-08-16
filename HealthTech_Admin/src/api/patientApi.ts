import axios from "../utils/axios/AxiosHandlers"
import { PatientData } from "../utils/types/types"

export const patientAPI = {
  //get all patient
  getAllPatient: async () => {
    return await axios.get(`/admin/patients`)
  },
  //add new patient
  addNewPatient: async (payload:any) => {
    return await axios.post(`/admin/patients`,payload)
  },
  //get selected patient detail
  getPatientDetail: async (id:number|string) => {
    return await axios.get(`/admin/patients/${id}`)
  },
  //add new patient
  editPatientDetail: async (id:any,payload:any) => {
    return await axios.put(`/admin/patients/${id}`,payload)
  },
  
}