import HttpService from '../../services/http.service'
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
    const { data } = await HttpService.post('auth/register', userData)

    if (data) {
        authService.saveToken(data.access_token)
    }

    return data
}

const logout = async () => {
    await HttpService.post('auth/logout', [])
    authService.removeToken()
}

const login = async (userData: ILoginValues) => {
    const { data } = await HttpService.post('auth/login', userData)

    if (data) {
        authService.saveToken(data.access_token)
    }

    return data
}

const me = async () => {
    const { data } = await HttpService.get('me')
    return data
}

const authAction = {
    register,
    logout,
    login,
    me,
}

export default authAction
