

import axios from "axios";
import Cookies from "js-cookie";

const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    // baseURL: process.env.APP_API_BASE_URL,
});

httpClient.interceptors.request.use(function (config) {
    const token = Cookies.get('token')
    console.log('tokenzzzz', token)
    // @ts-ignore
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

export default httpClient