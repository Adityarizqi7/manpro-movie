import React from 'react'

export default React.memo(function MiniCardBlog({
    children,
    text1,
    text2,
    classname,
    classname2,
    classname3,
    classImage = 'w-[2.5rem]',
    path,
}) {
    return (
        <div className={`${classname} author-detail`}>
            <img
                className={`${classImage} image-avatar aspect-square rounded-full object-cover object-center`}
                src={path}
                alt='Blog'
            />
            <div className='name-date space-y-1'>
                <h3 className={`${classname2} name-author`}>{text1}</h3>
                <h3 className={`${classname3} name-author`}>
                    {text2}
                    {children}
                </h3>
            </div>
        </div>
    )
})
