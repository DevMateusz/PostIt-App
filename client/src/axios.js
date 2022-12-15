import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `${import.meta.env.API_BASE_URL}`
})

export default axiosClient;