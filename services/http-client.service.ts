import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { UnauthorizedError } from '../utils/Error'
import Cookies from "js-cookie";


class HttpClientService {
    token: string = '';

    protected static api = (token?: string) => {
        const api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
        })

        api.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error) => {
                if (error.response.status === 401) {
                    if (typeof window === 'undefined') {
                        throw new UnauthorizedError('Unauthorized') //Throw custom error here
                    } else {
                        console.log('errro')
                    }
                    return Promise.reject()
                }
                return Promise.reject(error)
            }
        )

        api.interceptors.request.use((config:AxiosRequestConfig) => {
            if (!token) {
                 token = Cookies.get("token");
            }
            if (token && token != "" && config.headers) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        });


        return api
    }

    public static get = async (url: string) => {
        const api = this.api()
        return await api.get(url)
    }

    public static post = async (url: string, data: any) => {
        const api = this.api()
        return await api.post(url, data)
    }

    public static delete = async (url: string) => {
        const api = this.api()
        return await api.delete(url)
    }
}

export default HttpClientService
