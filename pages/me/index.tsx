import React, {useEffect, useState} from 'react'
import { IUser } from '../../types/User'
import AdminHttpService from "../../services/http-server.service";
import AuthLayout from "../../components/Layout/Auth";
import FormInput from "../../components/Common/Form/Input";
import ButtonWithLoading from "../../components/Common/Form/ButtonWithLoading";


export const getServerSideProps = async (context: any) => {
    const {data} = await AdminHttpService.getServer('me', context.req.cookies.token)
    const user = data.data
    return {
        props: { user },
    }
}

interface IProps {
    user: IUser
}

const Me = ({user}: IProps): JSX.Element => {
    const [form, setForm] = useState({
        name: '',
        email: ''
    })

    const {name,email} = form

    useEffect(() => {
        setForm({ ...form, email: user.email, name: user.name })
    },[])

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
