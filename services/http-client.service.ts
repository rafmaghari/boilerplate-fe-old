import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { UnauthorizedError } from '../utils/Error'
import Cookies from "js-cookie";
import {getSession} from "next-auth/react";


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
                    }
                    return Promise.reject()
                }
                return Promise.reject(error)
            }
        )

        api.interceptors.request.use(async (config:AxiosRequestConfig) => {
            // if (!token) {
            //     const session = await getSession() as any;
            //     token = session.access_token
            // }
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

    public static put = async (url: string, data: any) => {
        const api = this.api()
        return await api.put(url, data)
    }
}

export default HttpClientService
