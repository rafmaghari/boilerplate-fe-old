import React from 'react'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Props {
    pageTitle: string
    children: any
}

export const Layout: React.FC<Props> = ({ children, pageTitle }) => {
    const title = `${process.env.NEXT_PUBLIC_APP_NAME} - ${pageTitle}`
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            {children}
            <ToastContainer />
        </>
    )
}
