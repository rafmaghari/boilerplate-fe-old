import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    decrement,
    increment,
    selectValue,
} from '../../features/sample/counterSlice'

const Sample = () => {
    const count = useSelector(selectValue)
    const dispatch = useDispatch()
    return (
        <div>
            <h1>The value of count is {count}</h1>
            <button
                className="bg-blue-500 text-blue-50 px-5 py-1 rounded"
                onClick={() => dispatch(increment())}
            >
                Increment
            </button>
            <button
                className="bg-red-500 text-red-50 px-5 py-1 rounded mx-1"
                onClick={() => dispatch(decrement())}
            >
                Decrement
            </button>
        </div>
    )
}

export default Sample
