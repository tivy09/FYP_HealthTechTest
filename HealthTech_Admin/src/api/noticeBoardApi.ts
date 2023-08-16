import axios from "../utils/axios/AxiosHandlers"

export const noticeBoardAPI = {
  //appointment list
  getAllNotice: async () => {
    return await axios.get(`/admin/noticeBoards`)
  },
  //submit notice
  submitNotice:async (data:any) => {
    return await axios.post(`/admin/noticeBoards`,data)
  },
  //change notice status
  updateNoticeStatus:async(id:number)=>{
    return await axios.post(`/admin/active-noticeBoards/${id}`)
  }
}