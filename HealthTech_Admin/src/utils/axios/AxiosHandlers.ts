import { useIonToast } from '@ionic/react';
import axios from 'axios';
import { getToken } from '../capacitor/CapacitorStore';
import { useHistory } from 'react-router';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../app/auth/authSlice';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// Request interceptor for API calls
axios.interceptors.request.use(
  async config => {
    // const value = await redisClient.get(rediskey)

    config.headers = {
      'Accept': 'application/json;multipart/form-data',
    }

    // ! Should be replaced with Cookies afterward or somewhere safe     
    const token = await getToken('Token');

    if (token === null || token === undefined)
      return config;

    config.headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json;multipart/form-data',
    }

    return config;
  },
  error => {
    Promise.reject(error)
  });




// Response interceptor for API calls
axios.interceptors.response.use((response) => {
  return response
}, async function (error: any) {
  const originalRequest = error.config;

  if (error && error.response.status === 401) {
    // TODO: Looking for a way to centralize error handling 
    // (https://www.pluralsight.com/guides/centralized-error-handing-with-react-and-redux) 
    return Promise.reject(error)
  }
   
  return Promise.reject(error);
});



export default axios;