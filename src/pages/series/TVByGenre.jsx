import React from 'react'
import tmdb from '@/api/tmbd'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { GlobalContext } from '@/routes/Router'

import '@/styles/series/_tvbygenre.scss'
import 'react-loading-skeleton/dist/skeleton.css'

import Netray from '@/layouts/Netray'
import { SeriesCard } from '@/components/movie/MovieCard'

export default function TVByGenre() {
    const { genreId } = useParams()

    const [genre, setGenre] = React.useState([])
    const [tVGenre, setTVGenre] = React.useState([])

    const [index, setIndex] = React.useState(1)
    const [loading, setLoading] = React.useState(false)

    const theme = React.useContext(GlobalContext).theme;

    const renderTheme = (theme, dark = "", light = "") =>{
        if(theme === "dark") {
            return dark;
        }
    }

    const loadMore = () => {
        setLoading(true)
        setIndex(index + 1)
        setLoading(false)
    }

    const getDataTVGenre = React.useCallback(async () => {
        try {
            setLoading(true)
            const { data, status } = await tmdb.get(`/discover/tv`, {
                params: {
                    with_genres: genreId,
                    page: Math.floor(Math.random() * 4) + 1,
                },
            })
            status === 200 && setTVGenre(data.results)
            setLoading(false)
        } catch {
            setLoading(false)
        }
    }, [])

    const getGenre = React.useCallback(async () => {
        try {
            setLoading(true)
            const { data, status } = await tmdb.get(`/genre/tv/list`)
            status === 200 &&
                setGenre(
                    data.genres.filter(
                        (value) => parseInt(value.id) === parseInt(genreId)
                    )
                )
            setLoading(false)
        } catch {
            setLoading(false)
        }
    }, [])

    React.useEffect(() => {
        getGenre()
        getDataTVGenre()
    }, [getDataTVGenre, getGenre])

    return (
        <Netray
            title={`${genre.map((e) => e.name)} Series - Netray`}
            kw={`${genre.map((e) => e.name)} Series`}
            desc={`${genre.map(
                (e) => e.name
            )} Genre - Netray. Lihat film-film apa saja sesuai genre kesukaan kalian.`}
            ogUrl={''}
            ogType={''}
            ogTitle={''}
            ogDesc={''}
            twitTitle={''}
        >
            <main className={`${renderTheme(theme, "bg-dark-theme")} tvby-genre-movies-component`}>
                <section id='tvby_genre_container_movies'>
                    <div className='heading-tvby-genre-movies montserrat mb-8'>
                        <h1 className={`${renderTheme(theme, "text-white", 'text-black')} text-[2rem] font-semibold`}>
                            {genre.map((e) => e.name + ' Series')}
                        </h1>
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
                                        {tVGenre.map((item, index) => {
                                            return (
                                                <SeriesCard
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
        </Netray>
    )
}
