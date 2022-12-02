import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { UnauthorizedError } from '../utils/Error'
import authService from './auth.service'

class HttpService {
    private static api = () => {
        const api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
        })

        api.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error) => {
                console.log(error)
                if (error.response.status === 401) {
                    if (typeof window === 'undefined') {
                        throw new UnauthorizedError('Unauthorized') //Throw custom error here
                    } else {
                        window.location.href = '/login'
                    }
                    return Promise.reject()
                }
                return Promise.reject(error)
            }
        )

        api.interceptors.request.use((config: any) => {
            const token = '9|Un19wQIOZ1CmrZX9nghC74EpWPZ5ZRuz5TKCtQA6'
            config.headers['Authorization'] = `Bearer ${token}`
            return config
        })

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

export default HttpService
