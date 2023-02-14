import React from 'react';

interface IProps  {
    label: string;
    size?: string
    variant: string
    disabled?: boolean
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const Button = ({
                label,
                size = 'px-12 py-3',
                variant,
                disabled = false,
                onClick
        }: IProps) => {
    return (
            <button
                className={`flex inline-block shrink-0 rounded-md border border-${variant}-600
               bg-${variant}-600 ${size} text-sm font-medium text-white
                transition hover:bg-transparent hover:text-${variant}-600
                focus:outline-none focus:ring active:text-${variant}-500 
                ${disabled && 'bg-gray-100 border-gray-300 text-gray-500'}`}
                onClick={onClick}
                disabled={disabled}
            >
                {label}
            </button>
    );
};

export default Button;