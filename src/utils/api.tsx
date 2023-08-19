import axios from "axios"


const baseURL: string = 'http://localhost:3002'

const instance = axios.create(
  {
    baseURL: baseURL
  }
)

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('accessToken');
  if(token) {
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  }

  return config
});

export const getContactForId = (id: any) => {
  return instance.get('/contacts' + id)
}

export default instance