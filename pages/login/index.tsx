import React, {useState} from 'react'
import Link from 'next/link'

import {Layout} from '../../components/Layout/Guest'
import AuthSideContent from '../../components/Common/Auth/AuthSideContent'
import AuthResponsiveContent from '../../components/Common/Auth/AuthResponsiveContent'
import FormInput from '../../components/Common/Form/Input'
import ButtonWithLoading from "../../components/Common/Form/ButtonWithLoading";
import {signIn} from "next-auth/react";
import {NextAuthError} from "../../types/NextAuthError";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const Login = (): JSX.Element => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const router = useRouter()

    const [isError, setIsError] = useState(false)
    const [errors, setErrors] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { email, password } = form

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault()
       setIsLoading(true)
       setErrors('')
       setIsError(false)

       const res =  await signIn('credentials', {
            email: email,
            password: password,
            redirect: false
        })

        const {error, ok} = res as NextAuthError;
        if (ok) {
            await router.push('/home')
        } else {
            const parsedError = JSON.parse(error)
            if (!parsedError.errors) {
                toast('Invalid Credentials', { type: 'error' })
            } else {
                setErrors(parsedError.errors)
            }
            setIsError(true)
        }
        setIsLoading(false)
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
