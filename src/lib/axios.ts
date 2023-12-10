import Axios, { AxiosRequestConfig } from "axios";
import { notifications } from "@mantine/notifications";

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
    if (error.response?.status !== 401) {
      notifications.show({
        title: "エラー",
        message: error.response?.data.message,
        color: "red",
        autoClose: 5000,
      });
    }
    return Promise.reject(error);
  }
);

export default client;
