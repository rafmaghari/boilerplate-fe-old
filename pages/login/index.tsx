import React, { useEffect, useState } from 'react'
import { RootState, useAppDispatch } from '../../store/store'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { toast } from 'react-toastify'

import { ILoginValues } from '../../features/auth/authAction'
import { login, reset } from '../../features/auth/authSlice'

import { Layout } from '../../components/Layout/Guest'
import AuthSideContent from '../../components/Common/Auth/AuthSideContent'
import AuthResponsiveContent from '../../components/Common/Auth/AuthResponsiveContent'
import Spinning from '../../components/Common/Loading/Spinning'
import FormInput from '../../components/Common/Form/Input'
import ButtonWithLoading from "../../components/Common/Form/ButtonWithLoading";

const Login = (): JSX.Element => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const { email, password } = form
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { isError, message, isSuccess, errors, isLoading } = useSelector(
        (state: RootState) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast(message, { type: 'error' })
        }

        if (isSuccess) {
            router.push('/me')
        }

        router.events.on('routeChangeStart', (url, { shallow }) => {
            dispatch(reset())
        })
    }, [isError, isSuccess, message, errors])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const userData: ILoginValues = {
            email,
            password,
        }

        dispatch(login(userData))
    }
    return (
        <Layout pageTitle="Login">
            <section className="bg-gray-50">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <AuthSideContent />
                    <main
                        aria-label="Main"
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
                    >
                        <div className="max-w-xl lg:max-w-3xl">
                            <AuthResponsiveContent />
                            <p className="text-3xl text-bolder hidden lg:block">
                                Good to you see you again!
                            </p>
                            <form
                                onSubmit={onSubmit}
                                className="mt-4 grid grid-cols-6 gap-6"
                            >
                                <div className="col-span-6">
                                    <FormInput
                                        label="Email"
                                        hasError={isError}
                                        errors={errors}
                                        type="email"
                                        name="email"
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="col-span-6">
                                    <FormInput
                                        hasError={isError}
                                        errors={errors}
                                        label="Password"
                                        type="password"
                                        name="password"
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <ButtonWithLoading label="Login" isLoading={isLoading} />

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Don't have an account yet?
                                        <Link href="/register" className="underline">
                                                Register
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </section>
        </Layout>
    )
}

export default Login
