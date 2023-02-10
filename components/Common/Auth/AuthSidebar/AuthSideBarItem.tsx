import React from 'react';
import  Link  from 'next/link'

interface IProps {
    children: any,
    label: string,
    route?: string,
    onClickFunction?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AuthSideBarItem = ({children, label, route, onClickFunction}: IProps) => {
    let display;
    if (route) {
        display =<Link href={route} className="inline-block w-full h-full px-3 py-2 font-bold text-white">
            {children}
            {label}
        </Link>
    } else {
        display =<a href="#" className="inline-block w-full h-full px-3 py-2 font-bold text-white" onClick={() => onClickFunction}>
            {children}
            {label}
        </a>

    }
    return display
};

export default AuthSideBarItem;