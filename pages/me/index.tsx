import React  from 'react'
import { IUser } from '../../types/User'
import AdminHttpService from "../../services/http-server.service";
import {Layout} from "../../components/Layout/Guest";
import AuthLayout from "../../components/Layout/Auth";
import {UnauthorizedError} from "../../utils/Error";


export const getServerSideProps = async (context: any) => {
    const {data} = await AdminHttpService.getServer('me', context.req.cookies.token)
    const user = data.data
    return {
        props: { user }, // will be passed to the page component as props
    }
}

interface IProps {
    user: IUser
}

const Me = ({user}: IProps): JSX.Element => {
    return (
        <AuthLayout pageTitle="My Profile" >
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
        </AuthLayout>
    )
}


export default Me
