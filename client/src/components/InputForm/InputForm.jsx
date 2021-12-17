import React from 'react'

export default function InputForm({children,onSubmit}) {
    return (
        <form className='input-form' onSubmit={onSubmit}>
            {children}
        </form>
    )
}
