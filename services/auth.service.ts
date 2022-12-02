import { deleteCookie, getCookie, setCookie } from 'cookies-next'

class AuthService {
    public static saveToken = (token: string) => {
        setCookie('token', token)
    }

    public static removeToken = () => {
        deleteCookie('token')
    }

    public static getToken = () => {
        return getCookie('token')
    }
}

export default AuthService
