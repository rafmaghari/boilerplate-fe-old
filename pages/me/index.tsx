import React, {useEffect, useState} from 'react'
import { IUser } from '../../types/User'
import AuthLayout from "../../components/Layout/Auth";
import FormInput from "../../components/Common/Form/Input";
import {useSession} from "next-auth/react";


export const getServerSideProps = async (context: any) => {
    // const {data} = await AdminHttpService.getServer('me', context.req.cookies.token)
    const user = null
    return {
        props: { user },
    }
}

interface IProps {
    user: IUser
}

const Me = ({user}: IProps): JSX.Element => {
    const { data: session, status } = useSession()

    const [form, setForm] = useState({
        name: '',
        email: '',
    })

    const {name,email} = form

    useEffect(() => {
        if (status !== 'loading') {
            setForm({ ...form, email: session?.user?.email as string, name: session?.user?.name as string })
        }
    },[session])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <AuthLayout pageTitle="My Profile" >
            <div className="w-1/2">
                <div className="my-2">
                    <FormInput
                        hasError={false}
                        errors={null}
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        label="Name"
                        disabled={true}
                    />
                </div>
                <div className="my-2">
                    <FormInput
                        hasError={false}
                        errors={null}
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        label="Email"
                        disabled={true}
                    />
                </div>
            </div>
        </AuthLayout>
    )
}


export default Me
