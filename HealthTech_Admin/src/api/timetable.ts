import axios from "../utils/axios/AxiosHandlers"

export const timetableApi = {
  //appointment list
  getTimeTable: async () => {
    return await axios.get(`/admin/timetables`)
  },
  //save timetable

  //check single timetable
}