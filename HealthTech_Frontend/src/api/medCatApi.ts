import axios from "../utils/axios/AxiosHandlers"
import { MedicineCategoryData } from "../utils/types/types"

export const medCatAPI = {
  getMedCatList: async () => {
    return await axios.get(`/admin/medicineCategories`)
  },
  getMedCatDetail: async (id:number) => {
    return await axios.get(`/admin/medicineCategories/${id}`)
  },
  deleteMedCat: async (id:number) => {
    return await axios.delete(`/admin/medicineCategories/${id}`)
  },
  updateMedCat: async (id:number,payload:MedicineCategoryData) => {
    return await axios.put(`/admin/medicineCategories/${id}`,payload)
  },
  addMedCat: async (payload:MedicineCategoryData) => {
    return await axios.post(`/admin/medicineCategories/`,payload)
  },
}