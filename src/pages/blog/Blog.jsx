import React from 'react'
import '@/styles/blog/_blog.scss'
import { Link } from 'react-router-dom'

const Blog = ({
    blog: { title, slug, image, slugCategory, category, createdAt },
}) => {
    return (
        <article className='card-wrapper article relative bg-white hover:-translate-y-2'>
            <Link to={`/blogs/${slugCategory}/${slug}`}>
                <img
                    src={image}
                    alt={title}
                    className='card-image h-[18rem] w-full object-cover'
                />
                <div className='card-content raleaway montserrat space-y-2 px-3 pt-5 pb-4'>
                    <h2>{title}</h2>
                    <h3>{createdAt}</h3>
                    <h3 className='title-image poppins raleaway absolute right-2 top-0 bg-blue-500 px-2 py-1 font-semibold text-neutral-100 shadow-sm'>
                        {category.split(',')[0]}
                    </h3>
                </div>
            </Link>
        </article>
    )
}

export default React.memo(Blog)
