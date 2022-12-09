import React from 'react';

const SearchInput = () => {
    return (
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button type="submit" className="p-1 focus:outline-none">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round"
                         strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"
                         className="w-4 h-4 text-black">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>
            </span>
            <input type="search" name="search"
                   className="w-full px-4 py-2 pl-12 rounded shadow outline-none text-black"
                   placeholder="Search..."/>
        </div>
    );
};

export default SearchInput;