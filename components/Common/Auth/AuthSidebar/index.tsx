import React from 'react';
import AuthSideBarItem from "./AuthSideBarItem";
import SearchInput from "./SearchInput";

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
                        <AuthSideBarItem label="Home" route="home">
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6 mr-2 -mt-2"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                            </svg>
                        </AuthSideBarItem>
                    </li>
                    <li className="mb-2 bg-blue-500 rounded shadow">
                        <AuthSideBarItem label="Blogs" route="/blogs" >
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6 mr-2 -mt-2"
                                 viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                      clipRule="evenodd"/>
                            </svg>
                        </AuthSideBarItem>
                    </li>
                    <li className="mb-2 rounded hover:shadow hover:bg-blue-800">
                        <AuthSideBarItem label="Reports" route="/reports" >
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6 mr-2 -mt-2"
                                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                        </AuthSideBarItem>
                    </li>
                    <li className="mb-2 rounded hover:shadow hover:bg-blue-800">
                        <AuthSideBarItem label="Inbox" route="/inbox" >
                            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6 mr-2 -mt-2"
                                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                        </AuthSideBarItem>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AuthSidebar;