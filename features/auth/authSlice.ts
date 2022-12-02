import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../services/auth.service'
import authAction, { ILoginValues, IRegisterValues } from '../auth/authAction'
import { IErrors } from '../../interfaces/Errors'
import { IUser } from '../../types/User'

const token = authService.getToken()

const initialState = {
    token: token ? token : null,
    user: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    errors: {} as any,
}

export const register = createAsyncThunk(
    'auth/register',
    async (user: IRegisterValues, thunkApi) => {
        try {
            return await authAction.register(user)
        } catch (e: any) {
            return thunkApi.rejectWithValue(e.response.data)
        }
    }
)

export const login = createAsyncThunk(
    '/auth/login',
    async (user: ILoginValues, thunkApi) => {
        try {
            return await authAction.login(user)
        } catch (e: any) {
            return thunkApi.rejectWithValue(e.response.data)
        }
    }
)

export const logout = createAsyncThunk('/auth/logout', async () => {
    await authAction.logout()
})

export const me = createAsyncThunk('/me', async () => {
    return await authAction.me()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.errors = {}
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload as IUser
            })
            .addCase(register.rejected, (state, action) => {
                const { message, errors } = action.payload as IErrors
                state.isLoading = false
                state.isError = true
                state.errors = errors
                state.message = message
                state.isLoading = false
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isSuccess = true
                state.user = action.payload as IUser
                state.isLoading = false
            })
            .addCase(login.rejected, (state, action) => {
                const { message, errors } = action.payload as IErrors
                state.isError = true
                state.user = {}
                state.errors = errors
                state.message = message
                state.isLoading = false
            })
            .addCase(me.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload as IUser
            })
    },
})

export const { reset } = authSlice.actions

export default authSlice.reducer
