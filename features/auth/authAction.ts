import HttpClientService from '../../services/http-client.service'
import authService from '../../services/auth.service'

export interface IRegisterValues {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export interface ILoginValues {
    email: string
    password: string
}

const register = async (userData: IRegisterValues) => {
    const { data } = await HttpClientService.post('auth/register', userData)

    if (data) {
        authService.saveToken(data.access_token)
    }

    return data
}

const logout = async () => {
    await HttpClientService.post('auth/logout', [])
    authService.removeToken()
}

const login = async (userData: ILoginValues) => {
    const { data } = await HttpClientService.post('auth/login', userData)

    if (data) {
        authService.saveToken(data.access_token)
    }

    return data
}

const me = async () => {
    if (typeof window === "undefined") {
        console.log('wer on the serverfff')
    } else {
        console.log('clientfff')
    }
    try {
      await HttpClientService.get('me')
    } catch (e) {
        console.log(e, 'error')
    }
}

const authAction = {
    register,
    logout,
    login,
    me,
}

export default authAction
