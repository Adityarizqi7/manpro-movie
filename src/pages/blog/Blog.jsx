import React from 'react';
import "@/styles/blog/_blog.scss";
import { Link } from 'react-router-dom';

const Blog = (
    {
        blog: {
            title,
            slug,
            image,
            slugCategory,
            category,
            createdAt,
        },
    }
) => {

  return (
    <article className="card-wrapper bg-white hover:-translate-y-2 relative article">
        <Link to={`/blogs/${slugCategory}/${slug}`}> 
            <img src={image} alt={title} className="card-image object-cover h-[18rem] w-full"/>
            <div className="card-content px-3 pt-5 pb-4 raleaway space-y-2 montserrat">
                <h2>{title}</h2>
                <h3>{createdAt}</h3>
                <h3 className="title-image poppins px-2 shadow-sm py-1 bg-blue-500 text-neutral-100 raleaway absolute right-2 top-0 font-semibold">{category.split(',')[0]}</h3>
            </div>
        </Link>
    </article>
  )
};

export default Blog;