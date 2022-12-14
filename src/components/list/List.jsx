import React from 'react'
import tmdb from '../../api/tmbd'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { GlobalContext } from '@/routes/Router'
import { ForwardIcon } from '@heroicons/react/24/outline'

import '@/styles/component/list/_list.scss'
import 'react-loading-skeleton/dist/skeleton.css'

export default React.memo(function List({
    title,
    className,
    id,
    urlAPI,
    type = 'movie',
}) {
    const [genre, setGenre] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const theme = React.useContext(GlobalContext).theme

    const renderTheme = React.useCallback((theme, dark = '', light = '') => {
        if (theme === 'dark') {
            return dark
        }
        return light
    }, [])

    const getGenreMovie = React.useCallback(async () => {
        try {
            setLoading(true)
            const { data, status } = await tmdb.get(urlAPI, {
                params: {
                    languages: 'id',
                },
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
                <h1
                    className={`${renderTheme(
                        theme,
                        'text-white',
                        'text-gray-900'
                    )} poppins text-[1.5rem] font-bold`}
                >
                    {title}
                </h1>
                <ForwardIcon
                    className={`${renderTheme(
                        theme,
                        'text-white',
                        'text-gray-700'
                    )} 'h-6 w-6`}
                />
            </div>
            <nav className='list-wrapper'>
                <ul className='h-[11rem] list-none overflow-y-scroll sm:h-[21rem]'>
                    {loading && <Skeleton height={30} count={5} />}
                    {!loading &&
                        genre.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`${renderTheme(
                                        theme,
                                        'hover:bg-gray-800',
                                        'hover:bg-gray-50'
                                    )} border-b-[1px] border-gray-300/50 px-2`}
                                >
                                    <Link to={`/genre/${item.id}/${type}`}>
                                        <div className='montserrat flex flex-wrap justify-between gap-3 pt-2 pb-1'>
                                            <h2
                                                className={`${renderTheme(
                                                    theme,
                                                    'text-white',
                                                    'text-gray-800'
                                                )} 'text-md line-clamp-1 font-medium`}
                                            >
                                                {item.name || <Skeleton />}
                                            </h2>
                                            <h2 className='text-md font-medium text-blue-600'>
                                                -
                                            </h2>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })}
                </ul>
            </nav>
        </aside>
    )
})
