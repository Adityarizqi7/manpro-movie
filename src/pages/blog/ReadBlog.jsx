import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { GlobalContext } from '@/routes/Router'
import { useBlogState } from '@/store/blogController'

import '@/styles/blog/_readblog.scss'
import Nevrays from '@/layouts/Nevrays'
import MiniCardBlog from '@/components/card/MiniCardBlog'
import SearchNotFound from '@/components/error/SearchNotFound'
import BtnSosmedShare from '@/components/button/BtnSosmedShare'

export default function ReadBlog() {
    const { slug, slugCategory } = useParams()
    const blog = useBlogState((state) => state.blog)
    const findBlog = useBlogState((state) => state.findBlog)
    const blogByCategory = useBlogState((state) => state.blogByCategory)
    const findBlogByCategory = useBlogState((state) => state.findBlogByCategory)

    const status = null
    const theme = React.useContext(GlobalContext).theme

    const renderTheme = React.useCallback((theme, dark = '', light = '') => {
        if (theme === 'dark') {
            return dark
        }
        return light
    }, [])

    React.useEffect(() => {
        findBlog(slug)
        findBlogByCategory(slugCategory)
    }, [findBlog, findBlogByCategory, slug, slugCategory])

    return blog ? (
        <Nevrays
            title={blog?.title + ' - Nevrays'}
            kw={`${blog?.title} blogs, ${blog?.title} artikel, ${blog?.title} blogs, ${blog?.title} id blogs, ${blog?.title} blogs indonesia`}
            desc={`Blog yang membahas mengenai ${blog?.title}`}
            ogUrl={status}
            ogType={status}
            ogTitle={status}
            ogDesc={status}
            twitTitle={status}
        >
            <main
                className={`${renderTheme(
                    theme,
                    'bg-dark-theme'
                )} readblog-component`}
            >
                <section id='container_readblog' className='w-full md:w-[70%]'>
                    <div className='content-blog inter space-y-10'>
                        <div className='flex items-center'>
                            <div className='flex w-full flex-wrap items-center gap-y-4'>
                                <Link to={`/blogs/${slugCategory}`}>
                                    <span className='rounded-[5px] bg-gray-200 py-2 px-2'>
                                        {blog?.category}
                                    </span>
                                </Link>
                                <span
                                    className={`${renderTheme(
                                        theme,
                                        '!text-neutral-100'
                                    )} px-[8px]`}
                                >
                                    ·
                                </span>
                                <span
                                    className={`${renderTheme(
                                        theme,
                                        '!text-neutral-100'
                                    )} font-medium`}
                                >
                                    {blog?.authorName}
                                </span>
                                <span
                                    className={`${renderTheme(
                                        theme,
                                        '!text-neutral-100'
                                    )} px-[8px]`}
                                >
                                    ·
                                </span>
                                <span
                                    className={`${renderTheme(
                                        theme,
                                        '!text-neutral-100'
                                    )}`}
                                >
                                    {blog?.readTime} min read
                                </span>
                            </div>
                            <BtnSosmedShare
                                classBtnShare='w-full flex items-center justify-end'
                                title={blog?.title}
                                fill='#CECDCD'
                                size='21'
                            />
                        </div>
                        <h2
                            className={`${renderTheme(
                                theme,
                                '!text-neutral-100'
                            )} card-title`}
                        >
                            {blog?.title}
                        </h2>
                        <img
                            className='card-image aspect-square h-[28rem] w-full object-cover 3xs:object-fill'
                            src={blog?.image}
                            alt={blog?.title}
                        />
                        <div className='card-text'>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: blog?.description,
                                }}
                                className={`${renderTheme(
                                    theme,
                                    '!text-neutral-100'
                                )} whitespace-pre-line align-bottom leading-relaxed`}
                            ></p>
                        </div>
                    </div>
                    <aside className='share-button inter mt-7 space-y-10 border-t border-solid border-y-gray-300 px-2 pt-12'>
                        <h2
                            className={`${renderTheme(
                                theme,
                                '!text-neutral-100'
                            )} text-center font-light leading-relaxed`}
                        >
                            Suka dengan konten ini? Yuk bagikan ke temanmu!
                        </h2>
                        <BtnSosmedShare
                            classBtnShare='6xs:space-x-0 6xs:flex-col 6xs:space-y-6 w-full flex items-center justify-center'
                            title={blog?.title}
                            fill='#00ADB5'
                        />
                    </aside>
                </section>
                <aside id='container_aside' className='hidden w-[30%] md:block'>
                    <div className='content-aside'>
                        <article className='card-relate-post inter bg-white'>
                            <div className='heading-relate-post'>
                                <h2 className='card-title'>Blog Terkait</h2>
                            </div>
                            <div className='content-relate-post flex-col space-y-7'>
                                {blogByCategory ? (
                                    blogByCategory.slice(0, 4).map((e, i) => {
                                        return e.id === blog?.id ? (
                                            false
                                        ) : (
                                            <span
                                                key={i}
                                                className='wrapper-post group flex flex-col'
                                            >
                                                <Link
                                                    to={`/blogs/${e.slugCategory}/${e.slug}`}
                                                >
                                                    <MiniCardBlog
                                                        path={e.image}
                                                        text1={e.title}
                                                        text2={e.createdAt}
                                                        classname='flex lg:flex-row flex-col lg:items-center items-start lg:space-x-3 space-x-0 lg:space-y-0 space-y-3'
                                                        classname2='transition-colors duration-300 text-gray-800 group-hover:text-teal-600 text-[1rem] font-medium line-clamp-1'
                                                        classname3='line-clamp-1 text-[#8A8888] text-[0.75rem] text-light'
                                                    />
                                                </Link>
                                            </span>
                                        )
                                    })
                                ) : (
                                    <div className='text-center'>
                                        <p className='text-gray-600'>
                                            Belum ada blog terkait
                                        </p>
                                    </div>
                                )}
                            </div>
                        </article>
                    </div>
                </aside>
            </main>
        </Nevrays>
    ) : (
        <main className='flex w-full justify-center'>
            <SearchNotFound classGif='max-w-[30rem] w-full' />
        </main>
    )
}
