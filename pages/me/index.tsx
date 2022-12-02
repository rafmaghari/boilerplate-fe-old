import React, { useEffect } from 'react'
import { IUser } from '../../types/User'
import { RootState, useAppDispatch } from '../../app/store'
import { useSelector } from 'react-redux'
import authAction from '../../features/auth/authAction'
import { UnauthorizedError } from '../../utils/Error'

const Me = (data: any): JSX.Element => {
    console.log(data)
    return (
        <div>
            <h1>Me</h1>
        </div>
    )
}

export async function getServerSideProps() {
    const data = await authAction.me()
    return {
        props: { data }, // will be passed to the page component as props
    }
}

export default Me
