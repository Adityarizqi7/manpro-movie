import React from 'react'
import tmdb from '@/api/tmbd'
import Skeleton from 'react-loading-skeleton'
import { GlobalContext } from '@/routes/Router'

import '@/styles/series/_airing.scss'
import 'react-loading-skeleton/dist/skeleton.css'

import Nevrays from '@/layouts/Nevrays'
import List from '@/components/list/List'
import { LoadMore } from '@/components/button/LoadMore'
import { SeriesCard } from '@/components/content/ContentCard'
import { HeadPrimary } from '@/components/heading/HeadPrimary'

export default function AiringSeries() {
    const inputRef = React.useRef()
    const [searchMovie, setSearchMovie] = React.useState('')
    const [focusInput, setFocusInput] = React.useState(false)

    const [airingTVAll, setAiringTVAll] = React.useState([])

    const [index, setIndex] = React.useState(1)
    const [loading, setLoading] = React.useState(1)

    const theme = React.useContext(GlobalContext).theme

    const renderTheme = React.useCallback((theme, dark = '', light = '') => {
        if (theme === 'dark') {
            return dark
        }

        return light
    }, [])

    const handleChange = React.useCallback(
        e => setSearchMovie(e.target.value),
        []
    )
    const deleteText = React.useCallback(() => setSearchMovie(''), [])

    const handleFocusInput = React.useCallback(
        event => {
            if ((event.ctrlKey || event.metaKey) && event.code === 'KeyK') {
                setFocusInput(true)
                event.preventDefault()
                inputRef.current.focus()
            }
            if (event.code === 'Escape') inputRef.current.blur() || deleteText()
        },
        [inputRef, deleteText]
    )

    const loadMore = React.useCallback(() => {
        setLoading(0)
        setIndex(idx => idx + 1)
        setLoading(1)
    }, [])

    const AiringTVAll = React.useCallback(async () => {
        try {
            setLoading(0)
            const { data, status } = await tmdb.get('/tv/airing_today', {
                params: {
                    page: index
                }
            })
            status === 200 && setAiringTVAll((oldData) => [...oldData, ...data.results])
            setLoading(1)
        } catch {
            setLoading(1)
        }
    }, [index])

    React.useEffect(() => {
        document.addEventListener('keydown', handleFocusInput)

        return () => {
            document.removeEventListener('keydown', handleFocusInput)
        }
    }, [handleFocusInput])

    React.useEffect(() => {
        AiringTVAll()
    }, [AiringTVAll])

    return (
        <Nevrays
            title='Series Airing Today- Nevrays'
            kw='airing today series, airing today series, airing today series, airing today series'
            desc='Series Airing Today- Nevrays. Lihat series dan TV Show apa saja Tayang Hari ini.'
            ogUrl={''}
            ogType={''}
            ogTitle={''}
            ogDesc={''}
            twitTitle={''}
        >
            <main
                className={`${renderTheme(
                    theme,
                    'bg-dark-theme'
                )} airing-series-component`}
            >
                <section id='airing_container_series'>
                    <div className='heading-airing-series montserrat mb-8'>
                        <HeadPrimary
                            title='Series Airing On Today'
                            classFunc={renderTheme(
                                theme,
                                'text-white',
                                'text-black'
                            )}
                            classHeading='text-[2rem] font-semibold'
                        />
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
                                } w-full bg-transparent pr-[3rem] md:w-[35%]`}
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
                    <section className='flex flex-col gap-5 md:flex-row'>
                        <List
                            type='tv'
                            title='Genres'
                            id='left-section'
                            urlAPI='/genre/tv/list'
                            className='list-container sticky top-[6rem] self-start order-1 hidden space-y-2 md:order-2 md:block md:w-[30%]'
                        />
                        <div
                            id='right_section'
                            className='section-container order-2 w-full md:order-1 md:w-[70%]'
                        >
                            <article
                                id='movie_all'
                                className='movie-container mb-14 space-y-8'
                            >
                                {loading === 0 ? (
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
                                        {airingTVAll
                                            .filter(value => {
                                                // eslint-disable-line array-callback-return
                                                if (searchMovie === '')
                                                    return value
                                                if (
                                                    value.original_name
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
                                {index <= 30 && (
                                    <LoadMore onClick={loadMore} state={loading} />
                                )}
                            </article>
                        </div>
                    </section>
                </section>
            </main>
        </Nevrays>
    )
}
