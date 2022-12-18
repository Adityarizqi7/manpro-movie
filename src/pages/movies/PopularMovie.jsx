import React from 'react'
import tmdb from '@/api/tmbd'
import Skeleton from 'react-loading-skeleton'

import '@/styles/movie/_popular.scss'
import 'react-loading-skeleton/dist/skeleton.css'

import { slice } from '@/utils/Slice'
import Netray from '@/layouts/Netray'
import List from '@/components/list/List'
import { Spin } from '@/components/loading/Spin'
import { MovieCard } from '@/components/movie/MovieCard'

export default function NowPlayingMovie() {
    const inputRef = React.useRef()
    const [searchMovie, setSearchMovie] = React.useState('')
    const [focusInput, setFocusInput] = React.useState(false)

    const [popularMVAll, setPopularMVAll] = React.useState([])

    const [index, setIndex] = React.useState(8)
    const [loading, setLoading] = React.useState(false)
    const initialPosts = slice(popularMVAll, 0, index)

    const handleChange = (e) => setSearchMovie(e.target.value)
    const deleteText = () => setSearchMovie('')

    const handleFocusInput = React.useCallback((event) => {
        if ((event.ctrlKey || event.metaKey) && event.code === 'KeyK') {
            setFocusInput(true)
            event.preventDefault()
            inputRef.current.focus()
        }
        if (event.code === 'Escape') inputRef.current.blur() || deleteText()
    }, [])

    const loadMore = () => {
        setLoading(true)
        setIndex(index + 4)
        setLoading(false)
    }

    const PopularMVAll = React.useCallback(async () => {
        try {
            setLoading(true)
            const { data, status } = await tmdb.get('/movie/popular', {
                params: {
                    region: 'ID',
                },
            })
            status === 200 && setPopularMVAll(data.results)
            setLoading(false)
        } catch {
            setLoading(false)
        }
    }, [])

    React.useEffect(() => {
        document.addEventListener('keydown', handleFocusInput)

        return () => {
            document.removeEventListener('keydown', handleFocusInput)
        }
    }, [handleFocusInput])

    React.useEffect(() => {
        PopularMVAll()
    }, [PopularMVAll])

    return (
        <Netray
            title='Now Playing Movies - Netray'
            kw='now playing movies, now playing movies, now playing movies, now playing movies'
            desc='Now Playing Movies - Netray. Lihat film-film apa saja yang sedang tayang di platform film kesayangan anda.'
            ogUrl={''}
            ogType={''}
            ogTitle={''}
            ogDesc={''}
            twitTitle={''}
        >
            <main className='popular-movies-component'>
                <section id='popular_container_movies'>
                    <div className='heading-popular-movies montserrat mb-8'>
                        <h1 className='text-[2rem] font-semibold text-black'>
                            Popular Movies
                        </h1>
                    </div>
                    <div className='search-movies montserrat mb-10'>
                        <div className='box-search inter relative w-full md:w-[35%]'>
                            <input
                                type='text'
                                name='search-movie'
                                autoComplete='off'
                                className={`${
                                    focusInput
                                        ? 'border-b-[rgb(72, 96, 228)]'
                                        : false
                                } w-full pr-[3rem] md:w-[35%]`}
                                placeholder='Cari movie yang sedang popular ...'
                                onChange={handleChange}
                                ref={inputRef}
                                value={searchMovie}
                            />
                            {searchMovie !== '' && (
                                <>
                                    <kbd
                                        onClick={deleteText}
                                        className='montserrat absolute top-[0.85rem] right-0 hidden cursor-pointer rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 text-xs font-semibold text-gray-800 sm:block'
                                    >
                                        Esc
                                    </kbd>
                                    <kbd
                                        onClick={deleteText}
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
                                        searchMovie !== '' ? 'hidden' : 'block'
                                    } inter absolute top-[1.15rem] right-0 text-[14px] font-semibold text-gray-400`}
                                >
                                    Ctrl K
                                </h1>
                            }
                        </div>
                    </div>
                    <section className='flex flex-col gap-5 sm:flex-row'>
                        <List
                            title='Genres'
                            id='left-section'
                            className='list-container order-1 hidden space-y-2 sm:order-2 md:block md:w-[30%]'
                            urlAPI='/genre/movie/list'
                        />
                        <div
                            id='right_section'
                            className='section-container order-2 w-full sm:order-1 md:w-[70%]'
                        >
                            <article
                                id='movie_all'
                                className='movie-container mb-14 space-y-8'
                            >
                                {loading ? (
                                    <>
                                        <Skeleton
                                            height={300}
                                            count={4}
                                            containerClassName='flex gap-[10px]'
                                        />
                                        <Skeleton
                                            height={25}
                                            count={4}
                                            containerClassName='flex gap-[10px] mt-3'
                                        />
                                    </>
                                ) : (
                                    <div className='container-list-card grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-4'>
                                        {initialPosts
                                            .filter((value) => {
                                                // eslint-disable-line array-callback-return
                                                if (searchMovie === '')
                                                    return value
                                                if (
                                                    value.title
                                                        ?.toLowerCase()
                                                        .includes(
                                                            searchMovie
                                                                ?.toLowerCase()
                                                                .trim()
                                                        ) ||
                                                    value.original_title
                                                        ?.toLowerCase()
                                                        .includes(
                                                            searchMovie
                                                                ?.toLowerCase()
                                                                .trim()
                                                        )
                                                ) {
                                                    return value
                                                }
                                            })
                                            .map((item, index) => {
                                                return (
                                                    <MovieCard
                                                        key={index}
                                                        {...item}
                                                    />
                                                )
                                            })}
                                    </div>
                                )}
                                {index !== 20 && (
                                    <button
                                        onClick={loadMore}
                                        className={`${
                                            loading && 'pointer-events-none'
                                        } poppins shadow-sm' w-full bg-blue-500 py-3 text-[1.125rem] text-white transition-colors duration-300 hover:bg-opacity-80 focus:outline-none`}
                                    >
                                        {loading ? <Spin /> : 'load more'}
                                    </button>
                                )}
                            </article>
                        </div>
                    </section>
                </section>
            </main>
        </Netray>
    )
}
