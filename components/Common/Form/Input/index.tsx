import React from 'react'

interface IFormInput {
    label?: string
    hasError: boolean
    errors: any
    type: 'text' | 'password' | 'email'
    value?: string
    name: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean,
}
const defaultProps = {
    disabled: false,
}
const FormInput = (props: IFormInput) => {
    props = {...defaultProps, ...props}
    return (
        <div className="FormInput">
            {/* Label */}
            <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-700"
            >
                {props.label}
            </label>

            {/* Input */}
            <input
                className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm ${
                    props.hasError && 'border-red-400'
                } ${props.disabled && 'bg-gray-100'}` }
                name={props.name}
                type={props.type}
                onChange={props.onChange}
                value={props.value}
                disabled={props.disabled}
            />

            {/* Errors */}
            {props.errors && props.errors[props.name] && (
                <p className="bg-red-400 text-red-50 px-2 py-1 my-1 rounded text-sm">
                    {props.errors[props.name]}
                </p>
            )}
        </div>
    )
}

export default FormInput
