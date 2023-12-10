import { parse } from "path";

import Axios, { AxiosRequestConfig } from "axios";
import qs from "qs";

const axiosConfig: AxiosRequestConfig<any> = {
  timeout: 30000,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  paramsSerializer: {
    encode: parse as any,
    serialize: (params) => qs.stringify(params, { arrayFormat: "brackets" }),
  },
};

const client = Axios.create(axiosConfig);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default client;
