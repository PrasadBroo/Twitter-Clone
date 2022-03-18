import React from 'react'
const classNames = require("classnames");

export default function SimpleSpinner({topCenter,className}) {
    const loaderClassnames = classNames('loader-wrap',{
        'topCenter':topCenter,
      },className);
    return (
        <div className={loaderClassnames}>
            <div className="loader"></div>
        </div>
    )
}
