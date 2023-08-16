import axios from "../utils/axios/AxiosHandlers"
import axiosFD from 'axios'
import { getToken } from "../utils/capacitor/CapacitorStore"

export const storeImageApi = {

    storeImage: async (payload:any) => { 
        const fd = new FormData();
        fd.append('document', (payload))
        fd.append('type', '1')
        fd.append('title', 'Avatar')
       
        const token = getToken('token')
        return axiosFD.post(`${process.env.REACT_APP_BASE_URL}system/image-store`, fd, {
            headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'Multipart/form-data'
            }
        })
    }
}