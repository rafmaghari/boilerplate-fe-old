import React from 'react';
import Spinning from "../../Loading/Spinning";

interface IProps  {
   label: string;
   isLoading: boolean
}
const ButtonWithLoading = ({label, isLoading}: IProps) => {
    return (
        <button disabled={isLoading} className="flex inline-block shrink-0 rounded-md border border-blue-600 bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
            {isLoading && <Spinning />} {label}
        </button>

    );
};

export default ButtonWithLoading;