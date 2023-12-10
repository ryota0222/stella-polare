import Axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig<any> = {
  timeout: 30000,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
};

const client = Axios.create(axiosConfig);

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default client;
