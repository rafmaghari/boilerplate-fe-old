import React from 'react';

interface IProps  {
    label: string;
    size?: string
    variant: string
    disabled?: boolean
    buttonType?: 'button' | 'submit'
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const Button = ({
                label,
                size = 'px-12 py-3',
                variant,
                disabled = false,
                buttonType = 'button',
                onClick
        }: IProps) => {

    const buttonVariant: any = {
        'primary': 'bg-blue-600 border-blue-600 hover:text-blue-600 active:text-blue-500 ',
        'danger': 'bg-red-600 border-red-600 hover:text-red-600 active:text-red-500 '
    }
    return (
        <>
            {buttonType !== 'button' ? (
                <button
                    type="submit"
                    className={`flex inline-block shrink-0 rounded-md border 
                ${buttonVariant[variant]}
                ${size} text-sm font-medium text-white
                transition hover:bg-transparent 
                focus:outline-none focus:ring 
                ${disabled && 'bg-gray-100 border-gray-300 text-gray-500'}`}
                    disabled={disabled}
                >
                    {label}
                </button>
            ): (
                <button
                    type="button"
                    className={`flex inline-block shrink-0 rounded-md border 
                ${buttonVariant[variant]}
                ${size} text-sm font-medium text-white
                transition hover:bg-transparent 
                focus:outline-none focus:ring 
                ${disabled && 'bg-gray-100 border-gray-300 text-gray-500'}`}
                    onClick={onClick}
                    disabled={disabled}
                >
                    {label}
                </button>
            )}
        </>
    );
};

export default Button;