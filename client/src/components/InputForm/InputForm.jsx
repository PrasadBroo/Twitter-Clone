import React from 'react'

export default function InputForm({children,onSubmit,...otherProps}) {
    return (
        <form className='input-form' onSubmit={onSubmit} {...otherProps}>
            {children}
        </form>
    )
}
