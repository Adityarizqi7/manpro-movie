import React from 'react'
import tmdb from '../../api/tmbd'
import Skeleton from 'react-loading-skeleton'
import { ForwardIcon } from '@heroicons/react/24/outline'

import '@/styles/component/list/_list.scss'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom'

export default function List({ title, className, id, urlAPI }) {
    const [genre, setGenre] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const getGenreMovie = React.useCallback( async () => {
        try {
            setLoading(true)
            const { data, status } = await tmdb.get(urlAPI, {
                params: {
                    languages: 'id'
                }
            })
            status === 200 && setGenre(data.genres)
            setLoading(false)
        } catch {
            setLoading(false)
        }
    }, [])

    React.useEffect(() => {
        getGenreMovie()
    }, [getGenreMovie])

    return (
        <aside id={id} className={className}>
            <div className='heading-card montserrat flex w-full flex-wrap items-center justify-between gap-4'>
                <h1 className='poppins text-[1.5rem] font-bold text-gray-900'>
                    {title}
                </h1>
                <ForwardIcon className='h-6 w-6 text-gray-700' />
            </div>
            <nav className='list-wrapper'>
                <ul className='h-[11rem] list-none overflow-y-scroll sm:h-[21rem]'>
                    { loading && <Skeleton height={30} count={5} /> }
                    { 
                        !loading && 
                        genre.map((item, index) => {
                            return (
                                <Link key={index} to={`/genre/${item.id}/movie`}>
                                    <li
                                        className='border-b-[1px] border-gray-300/50 px-2 pt-2 pb-1 hover:bg-gray-50'
                                    >
                                            <div className='montserrat flex flex-wrap justify-between gap-3'>
                                                <h2 className='text-md line-clamp-1 font-medium text-gray-800'>
                                                    {item.name || <Skeleton />}
                                                </h2>
                                                <h2 className='text-md font-medium text-blue-600'>
                                                    -
                                                </h2>
                                            </div>
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </nav>
        </aside>
    )
}
