import { useIonToast } from '@ionic/react';
import axios from 'axios';
import { getToken } from '../capacitor/CapacitorStore';

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

  // console.log("Error", JSON.stringify(error))

  // if (error && error.response.status === 401) {
  //   // TODO: Looking for a way to centralize error handling 
  //   // (https://www.pluralsight.com/guides/centralized-error-handing-with-react-and-redux) 
  //   return Promise.reject(error)
  // }

  // if (error.response.status === 403 && !originalRequest._retry) {
  //   originalRequest._retry = true;
  //   // const access_token = await refreshAccessToken();            
  //   // axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;    
  //   return axios(originalRequest);
  // }
  // if (error && error.response.status === 429) {
  //   // TODO: Looking for a way to centralize error handling 
  //   // (https://www.pluralsight.com/guides/centralized-error-handing-with-react-and-redux) 
  //   alert("Too Many Request")
  //   return Promise.reject(error)
  // }
  return Promise.reject(error);
});

export default axios;