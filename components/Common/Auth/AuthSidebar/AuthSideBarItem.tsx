import React from 'react';
import  Link  from 'next/link'

interface IProps {
    children: any,
    label: string,
    route: string,
}

const AuthSideBarItem = ({children, label, route}: IProps) => {
    return (
        <Link href={route} className="inline-block w-full h-full px-3 py-2 font-bold text-white">
            {children}
            {label}
        </Link>
    );
};

export default AuthSideBarItem;