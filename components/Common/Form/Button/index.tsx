import React from 'react';

interface IProps  {
    children: any
    size?: string
    variant: string
    disabled?: boolean
    buttonType?: 'button' | 'submit'
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const Button = ({
                children,
                size = 'medium',
                variant,
                disabled = false,
                buttonType = 'button',
                onClick
        }: IProps) => {

    const buttonVariant: any = {
        'primary': 'bg-blue-600 border-blue-600 hover:text-blue-600 active:text-blue-500 ',
        'danger': 'bg-red-600 border-red-600 hover:text-red-600 active:text-red-500',
        'secondary': 'bg-gray-100 border-gray-300 hover:text-gray-600 active:text-gray-500 hover:bg-gray-300 text-gray-900'
    }

    const buttonSize: any = {
        'small': 'px-3 py-1',
        'medium': 'px-12 py-3',
        'large': 'px-20 py-6',
    }
    return (
        <>
            {buttonType !== 'button' ? (
                <button
                    type="submit"
                    className={`flex inline-block shrink-0 rounded-md border 
                ${buttonVariant[variant]}
                ${buttonSize[size]} text-sm font-medium text-white
                transition hover:bg-transparent 
                focus:outline-none focus:ring 
                ${disabled && 'bg-gray-100 border-gray-300 text-gray-500'}`}
                    disabled={disabled}
                >
                    {children}
                </button>
            ): (
                <button
                    type="button"
                    className={`flex inline-block shrink-0 rounded-md border 
                ${buttonVariant[variant]}
                ${buttonSize[size]} text-sm font-medium text-white
                transition hover:bg-transparent 
                focus:outline-none focus:ring 
                ${disabled && 'bg-gray-100 border-gray-300 text-gray-500'}`}
                    onClick={onClick}
                    disabled={disabled}
                >
                    {children}
                </button>
            )}
        </>
    );
};

export default Button;