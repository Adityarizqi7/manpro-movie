import React from 'react'
import tmdb from '@/api/tmbd'
import Skeleton from 'react-loading-skeleton'
import { GlobalContext } from '@/routes/Router'

import '@/styles/series/_ontv.scss'
import 'react-loading-skeleton/dist/skeleton.css'

import { slice } from '@/utils/Slice'
import Netray from '@/layouts/Netray'
import List from '@/components/list/List'
import { Spin } from '@/components/loading/Spin'
import { SeriesCard } from '@/components/movie/MovieCard'

export default function OnTVSeries() {
    
    const inputRef = React.useRef()
    const [searchMovie, setSearchMovie] = React.useState('')
    const [focusInput, setFocusInput] = React.useState(false)

    const [onTVAll, setOnTVAll] = React.useState([])

    const [index, setIndex] = React.useState(8)
    const [loading, setLoading] = React.useState(false)
    const initialPosts = slice(onTVAll, 0, index)

    const theme = React.useContext(GlobalContext).theme;

    const renderTheme = (theme, dark = "", light = "") =>{
        if(theme === "dark") {
            return dark;
        }
    }

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

    const OnTVAll = React.useCallback(async () => {
        try {
            setLoading(true)
            const { data, status } = await tmdb.get('/tv/on_the_air')
            status === 200 && setOnTVAll(data.results)
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
        OnTVAll()
    }, [OnTVAll])

    return (
        <Netray
            title='Currently Airing Series - Netray'
            kw='currently airing series, currently airing series, currently airing series, currently airing series'
            desc='Currently Airing Series - Netray. Lihat series dan TV Show apa saja yang sedang ditayangkan.'
            ogUrl={''}
            ogType={''}
            ogTitle={''}
            ogDesc={''}
            twitTitle={''}
        >
            <main className={`${renderTheme(theme, "bg-dark-theme")} ontv-series-component`}>
                <section id='ontv_container_series'>
                    <div className='heading-ontv-series montserrat mb-8'>
                        <h1 className={`${renderTheme(theme, "text-white", 'text-black')} text-[2rem] font-semibold`}>
                            Currently Airing Series
                        </h1>
                    </div>
                    <div className='search-series montserrat mb-10'>
                        <div className='box-search inter relative w-full md:w-[35%]'>
                            <input
                                type='text'
                                name='search-movie'
                                autoComplete='off'
                                className={`${
                                    focusInput
                                        ? 'border-b-[rgb(72, 96, 228)]'
                                        : false
                                } w-full pr-[3rem] md:w-[35%] bg-transparent`}
                                placeholder='Cari series, TV Show yang akan datang ...'
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
                                                    <SeriesCard
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
