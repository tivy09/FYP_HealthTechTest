import axios from "../utils/axios/AxiosHandlers"

export const noticeBoardAPI = {
  //appointment list
  getAllNotice: async () => {
    return await axios.get(`/admin/noticeBoards`)
  },
}