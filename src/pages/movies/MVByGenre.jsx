import React from 'react'
import tmdb from '@/api/tmbd'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

import '@/styles/movie/_mvbygenre.scss'
import 'react-loading-skeleton/dist/skeleton.css'

import Netray from '@/layouts/Netray'
import { Spin } from '@/components/loading/Spin'
import { MovieCard } from '@/components/movie/MovieCard'

export default function MVByGenre() {

    const { genreId } = useParams()

    const [genre, setGenre] = React.useState([])
    const [MVGenre, setMVGenre] = React.useState([])

    const [index, setIndex] = React.useState(1)
    const [loading, setLoading] = React.useState(false)

    const loadMore = () => {
        setLoading(true)
        setIndex(index + 1)
        setLoading(false)
    }

    const getDataMVGenre = React.useCallback( async () => {
        try {
            setLoading(true)
            const { data, status } = await tmdb.get(`/discover/movie`, {
                params: {
                    with_genres: genreId,
                    page: Math.floor(Math.random() * 4) + 1
                }
            })
            status === 200 && setMVGenre(data.results) 
            setLoading(false)
        } catch {
            setLoading(false)
        }
    }, [])

    const getGenre = React.useCallback( async () => {
        try {
            setLoading(true)
            const { data, status } = await tmdb.get(`/genre/list`)
            status === 200 && setGenre(data.genres.filter( value => parseInt(value.id) === parseInt(genreId))) 
            setLoading(false)
        } catch {
            setLoading(false)
        }
    }, [])
    
    
    React.useEffect(() => {
        getGenre()
        getDataMVGenre()
    }, [getDataMVGenre, getGenre])

    return (
        <Netray
            title='Genre Movies - Netray'
            kw={`${genre.map(e => e.name)} movies`}
            desc={`${genre.map(e => e.name)} Genre - Netray. Lihat film-film apa saja sesuai genre kesukaan kalian.`}
            ogUrl={''}
            ogType={''}
            ogTitle={''}
            ogDesc={''}
            twitTitle={''}
        >
            <main className='mvby-genre-movies-component'>
                <section id='mvby_genre_container_movies'>
                    <div className='heading-mvby-genre-movies montserrat mb-8'>
                        <h1 className='font-semibold text-black text-[2rem]'>
                            {
                                genre.map(e => e.name + ' Movie')
                            }
                        </h1>
                    </div>
                    <section>
                        <div
                            className='section-container w-full'
                        >
                            <article
                                id='movie_all'
                                className='movie-container mb-14 space-y-8'
                            >
                                {
                                    loading ? (
                                    <>
                                        <Skeleton height={300} count={4} containerClassName='flex gap-[10px]' />
                                        <Skeleton height={25} count={4} containerClassName='flex gap-[10px] mt-3' />
                                    </>
                                ) :
                                    <div className='container-list-card grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-7'>
                                        {
                                            MVGenre.map((item, index) => {
                                                return (
                                                    <MovieCard key={index} {...item} />
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </article>
                        </div>
                    </section>
                </section>
            </main>
        </Netray>
    )
}