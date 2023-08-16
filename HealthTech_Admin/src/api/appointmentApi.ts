import axios from "../utils/axios/AxiosHandlers"

export const appointmentAPI = {
  getAppointmentList: async () => {
    return await axios.get(`/admin/appointments`)
  },
  getAppointmentDetail: async (id:any) => {
    return await axios.get(`/admin/appointments/${id}`)
  },
}