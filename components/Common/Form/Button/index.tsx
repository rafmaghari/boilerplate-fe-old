import React from 'react';

interface IProps  {
    label: string;
    size?: string
    variant: string
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const Button = ({label, size = 'px-12 py-3', variant, onClick}: IProps) => {
    return (
            <button
                className={`flex inline-block shrink-0 rounded-md border border-${variant}-600
               bg-${variant}-600 ${size} text-sm font-medium text-white
                transition hover:bg-transparent hover:text-${variant}-600
                focus:outline-none focus:ring active:text-${variant}-500`}
                onClick={onClick}
            >
                {label}
            </button>
    );
};

export default Button;