import React from 'react'
import tmdb from '@/api/tmbd'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { GlobalContext } from '@/routes/Router'

import '@/styles/movie/_mvbygenre.scss'
import 'react-loading-skeleton/dist/skeleton.css'

import Nevrays from '@/layouts/Nevrays'
import { MovieCard } from '@/components/content/ContentCard'
import { HeadPrimary } from '@/components/heading/HeadPrimary'

export default function MVByGenre() {
    const { genreId } = useParams()

    const [genre, setGenre] = React.useState([])
    const [MVGenre, setMVGenre] = React.useState([])

    const [loading, setLoading] = React.useState(false)

    const theme = React.useContext(GlobalContext).theme

    const renderTheme = React.useCallback((theme, dark = '', light = '') => {
        if (theme === 'dark') {
            return dark
        }
        return light
    }, [])

    const getDataMVGenre = React.useCallback(async () => {
        try {
            setLoading(true)
            const { data, status } = await tmdb.get(`/discover/movie`, {
                params: {
                    with_genres: genreId,
                    page: Math.floor(Math.random() * 4) + 1,
                },
            })
            status === 200 && setMVGenre(data.results)
            setLoading(false)
        } catch {
            setLoading(false)
        }
    }, [genreId])

    const getGenre = React.useCallback(async () => {
        try {
            setLoading(true)
            const { data, status } = await tmdb.get(`/genre/movie/list`)
            status === 200 &&
                setGenre(
                    data.genres.filter(
                        value => parseInt(value.id) === parseInt(genreId)
                    )
                )
            setLoading(false)
        } catch {
            setLoading(false)
        }
    }, [genreId])

    React.useEffect(() => {
        getGenre()
        getDataMVGenre()
    }, [getDataMVGenre, getGenre])

    return (
        <Nevrays
            title={`${genre.map(e => e.name)} Movies - Nevrays`}
            kw={`${genre.map(e => e.name)} Movies`}
            desc={`${genre.map(
                e => e.name
            )} Genre - Nevrays. Lihat film-film apa saja sesuai genre kesukaan kalian.`}
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
                )} mvby-genre-movies-component`}
            >
                <section id='mvby_genre_container_movies'>
                    <div className='heading-mvby-genre-movies montserrat mb-8'>
                        <HeadPrimary
                            classFunc={renderTheme(
                                theme,
                                'text-white',
                                'text-black'
                            )}
                            classHeading='text-[2rem] font-semibold'
                        >
                            {genre.map(e => e.name)} Movies
                        </HeadPrimary>
                    </div>
                    <section>
                        <div className='section-container w-full'>
                            <article
                                id='movie_all'
                                className='movie-container mb-14 space-y-8'
                            >
                                {loading ? (
                                    <>
                                        <Skeleton
                                            height={300}
                                            count={4}
                                            containerClassName='flex flex-wrap gap-[10px]'
                                        />
                                        <Skeleton
                                            height={25}
                                            count={4}
                                            containerClassName='flex flex-wrap gap-[10px] mt-3'
                                        />
                                    </>
                                ) : (
                                    <div className='container-list-card grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-4'>
                                        {MVGenre.map((item, index) => {
                                            return (
                                                <MovieCard
                                                    key={index}
                                                    {...item}
                                                />
                                            )
                                        })}
                                    </div>
                                )}
                            </article>
                        </div>
                    </section>
                </section>
            </main>
        </Nevrays>
    )
}
