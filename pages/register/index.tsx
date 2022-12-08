import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Layout } from '../../components/Layout/Guest'
import { RootState, useAppDispatch } from '../../app/store'

import { register, reset } from '../../features/auth/authSlice'
import { IRegisterValues } from '../../features/auth/authAction'

import AuthSideContent from '../../components/Common/Auth/AuthSideContent'
import AuthResponsiveContent from '../../components/Common/Auth/AuthResponsiveContent'
import FormInput from '../../components/Common/Form/Input'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import Spinning from '../../components/Common/Loading/Spinning'

const Register = (): JSX.Element => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const { name, email, password, password_confirmation } = form
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
        const userData: IRegisterValues = {
            name,
            email,
            password,
            password_confirmation,
        }

        dispatch(register(userData))
    }
    return (
        <Layout pageTitle="Register">
            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <AuthSideContent />
                    <main
                        aria-label="Main"
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
                    >
                        <div className="max-w-xl lg:max-w-3xl">
                            <AuthResponsiveContent />
                            <p className="text-3xl text-bolder">
                                Register an account!
                            </p>
                            <form
                                onSubmit={onSubmit}
                                className="mt-8 grid grid-cols-6 gap-6"
                            >
                                <div className="col-span-6">
                                    <FormInput
                                        label="Name"
                                        hasError={isError}
                                        errors={errors}
                                        type="text"
                                        name="name"
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="col-span-6">
                                    <FormInput
                                        label="Email"
                                        hasError={isError}
                                        errors={errors}
                                        type="text"
                                        name="email"
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <FormInput
                                        label="Password"
                                        hasError={isError}
                                        errors={errors}
                                        type="password"
                                        name="password"
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <FormInput
                                        label="Confirm Password"
                                        hasError={isError}
                                        errors={errors}
                                        type="password"
                                        name="password_confirmation"
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button className="flex inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                                        {isLoading && <Spinning />} Create An
                                        Account
                                    </button>

                                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Already have an account?
                                        <Link href="/login" className="text-gray-700 underline">
                                                Log in
                                        </Link>
                                        .
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

export default Register
