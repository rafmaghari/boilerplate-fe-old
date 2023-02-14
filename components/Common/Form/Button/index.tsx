import React from 'react';

interface IProps  {
    label: string;
    size?: string
    variant: 'info' | 'danger' | 'warning'
}
const Button = ({label, size = 'px-12 py-3', variant}: IProps) => {
    let buttonVariant = '';
    if (variant === 'warning') {
        buttonVariant = 'yellow'
    } else if (variant === 'danger') {
        buttonVariant = 'red'
    } else {
       buttonVariant = 'blue'
    }
    return (
        <button
                className={`flex inline-block shrink-0 rounded-md border border-${buttonVariant}-600
                bg-${buttonVariant}-600 ${size} text-sm font-medium text-white
                transition hover:bg-transparent hover:text-${buttonVariant}-600 focus:outline-none focus:ring active:text-${buttonVariant}-500`}
        >
            {label}
        </button>
    );
};

export default Button;