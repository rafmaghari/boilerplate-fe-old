import React from 'react';
import AuthSideBarItem from "./AuthSideBarItem";
import SearchInput from "./SearchInput";
import {signOut} from "next-auth/react";
import {log} from "util";

const AuthSidebar = () => {
    const title = `${process.env.NEXT_PUBLIC_APP_NAME} - Admin`
    return (
        <div className="px-4 py-2 bg-gray-200 bg-blue-600 lg:w-1/4">
            <svg xmlns="http://www.w3.org/2000/svg" className="inline w-8 h-8 text-white lg:hidden" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <div className="hidden lg:block">
                <div className="my-2 mb-6">
                    <h1 className="text-2xl font-bold text-white text-center">{title}</h1>
                </div>
                <ul>
                    <li className="mb-6">
                        <SearchInput />
                    </li>
                    <li className="mb-2 rounded hover:shadow hover:bg-blue-800">
                        <AuthSideBarItem label="Home" route="/">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6 mr-2 -mt-2"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                            </svg>
                        </AuthSideBarItem>
                    </li>
                    <li className="mb-2 rounded hover:shadow hover:bg-blue-800">
                        <AuthSideBarItem label="Profile" route="/me" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="inline-block w-6 h-6 mr-2 -mt-2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                            </svg>

                        </AuthSideBarItem>
                    </li>
                    <li className="mb-2 rounded hover:shadow hover:bg-blue-800">
                        <AuthSideBarItem label="">
                            <button onClick={() => signOut()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                     stroke="currentColor" className="inline-block w-6 h-6 mr-2 -mt-2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/>
                                </svg>Sign out
                            </button>

                        </AuthSideBarItem>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AuthSidebar;