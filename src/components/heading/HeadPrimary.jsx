import React from 'react'

export const HeadPrimary = React.memo(({ classFunc, classHeading, title, children}) => {
    return (
        <h1
            className={`${classFunc} ${classHeading}`}
        >
            {title || children}
        </h1>
    )
})