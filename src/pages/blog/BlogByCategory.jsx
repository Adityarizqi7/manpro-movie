import React from 'react'
import { useParams } from 'react-router'
import { GlobalContext } from '@/routes/Router'

import '@/styles/blog/_blogs.scss'
import Nevrays from '@/layouts/Nevrays'
import ListBlogs from '@/pages/blog/ListBlogs'
import { useBlogState } from '@/store/blogController'
import SearchNotFound from '@/components/error/SearchNotFound'

export default function BlogByCategory() {
    const status = null
    const inputRef = React.useRef()
    const theme = React.useContext(GlobalContext).theme
    const [focusInput, setFocusInput] = React.useState(false)

    const { slugCategory } = useParams()
    const searchKey = useBlogState((state) => state.searchKey)
    const handleChange = useBlogState((state) => state.handleChange)
    const getBlogsByCategory = useBlogState((state) => state.getBlogsByCategory)
    const blogsByCategoryState = useBlogState(
        (state) => state.blogsByCategoryState
    )
    const clearKeySearchCategory = useBlogState(
        (state) => state.clearKeySearchCategory
    )
    const handleSearchResultsCategory = useBlogState(
        (state) => state.handleSearchResultsCategory
    )

    const handleSearchBar = React.useCallback((e) => {
        e.preventDefault()
        handleSearchResultsCategory()
    }, [handleSearchResultsCategory])

    const renderTheme = React.useCallback((theme, dark = '', light = '') => {
        if (theme === 'dark') {
            return dark
        }
        return light
    }, [])

    const handleFocusInput = React.useCallback((event) => {
        if ((event.ctrlKey || event.metaKey) && event.code === 'KeyK') {
            setFocusInput(true)
            event.preventDefault()
            inputRef.current.focus()
        }
        if (event.code === 'Escape') inputRef.current.blur() || clearKeySearchCategory()
    }, [inputRef, clearKeySearchCategory])

    React.useEffect(() => {
        getBlogsByCategory(slugCategory)
    }, [getBlogsByCategory, slugCategory])

    React.useEffect(() => {
        document.addEventListener('keydown', handleFocusInput)

        return () => {
            document.removeEventListener('keydown', handleFocusInput)
        }
    }, [handleFocusInput])

    return blogsByCategoryState ? (
        <Nevrays
            title={`${slugCategory.toUpperCase()} - Nevrays`}
            kw={`nevrays blogs ${slugCategory}, nevrays artikel ${slugCategory}, nevrays blogs ${slugCategory}, nevrays id blogs ${slugCategory}, nevrays blogs indonesia ${slugCategory}`}
            desc='Kumpulan daftar blogs dan artikel berdasarkan category yang berkaitan dengan movie and series dari Nevrays.'
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
                )} blog-component`}
            >
                <section id='container_blog'>
                    <div className='heading-blog montserrat space-y-3'>
                        <h1
                            className={`${renderTheme(
                                theme,
                                '!text-neutral-100'
                            )}`}
                        >
                            Insight "
                            <span className='capitalize'>{slugCategory}"</span>
                        </h1>
                        <h3
                            className={`${renderTheme(
                                theme,
                                '!text-neutral-100'
                            )}`}
                        >
                            ini adalah sebuah halaman membaca. Baca semua
                            artikel dari Nevrays.
                        </h3>
                    </div>
                    <form
                        className='search-blog space-x-5'
                        onSubmit={handleSearchBar}
                    >
                        <div className='box-search montserrat relative w-full md:w-[35%]'>
                            <input
                                type='text'
                                name='search-blog'
                                autoComplete='off'
                                className={`${
                                    focusInput
                                        ? 'border-b-[rgb(72, 96, 228)]'
                                        : false
                                } w-full bg-transparent pr-[3rem] md:w-[35%]`}
                                placeholder='Cari movie yang akan datang ...'
                                onChange={handleChange}
                                ref={inputRef}
                                value={searchKey}
                            />
                            {searchKey !== '' && (
                                <>
                                    <kbd
                                        onClick={clearKeySearch}
                                        className='montserrat absolute top-[0.85rem] right-0 hidden cursor-pointer rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 text-xs font-semibold text-gray-800 sm:block'
                                    >
                                        Esc
                                    </kbd>
                                    <kbd
                                        onClick={clearKeySearch}
                                        className='montserrat absolute top-[0.85rem] right-0 block cursor-pointer rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 text-xs font-semibold text-gray-800 sm:hidden'
                                    >
                                        Del
                                    </kbd>
                                </>
                            )}
                            {
                                <h1
                                    onClick={() => inputRef.current.focus()}
                                    className={`${
                                        searchKey !== '' ? 'hidden' : 'block'
                                    } inter absolute top-[1.15rem] right-0 text-[14px] font-semibold text-gray-400`}
                                >
                                    Ctrl K
                                </h1>
                            }
                        </div>
                    </form>
                    {blogsByCategoryState.length < 1 ? (
                        <div className='flex w-full justify-center'>
                            <SearchNotFound classGif='max-w-[30rem] w-full' />
                        </div>
                    ) : (
                        <div className='wrapper-list-blog grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
                            <ListBlogs
                                blogs={blogsByCategoryState}
                                searchQuestion={searchKey}
                            />
                        </div>
                    )}
                </section>
            </main>
        </Nevrays>
    ) : (
        <div className='flex w-full justify-center'>
            <SearchNotFound classGif='max-w-[30rem] w-full' />
        </div>
    )
}
