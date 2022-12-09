import React from 'react';
import AuthSidebar from "../../Common/Auth/AuthSidebar";
import Head from "next/head";

interface IProps {
    pageTitle: string,
    children: any
}

const AuthLayout = ({pageTitle, children}: IProps) => {
    const title = `${process.env.NEXT_PUBLIC_APP_NAME} - ${pageTitle}`
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="flex h-screen">
                <AuthSidebar />
                <div className="w-full px-4 py-2 bg-gray-50 lg:w-full">
                    <h1 className="text-5xl my-3">{pageTitle}</h1>
                    <div className="container mx-auto mt-12 text-gray-900">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthLayout;