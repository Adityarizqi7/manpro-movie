import React from 'react'
import tmdb from '../../api/tmbd'
import { ForwardIcon } from '@heroicons/react/24/outline'

import '@/styles/component/list/_list.scss'

export default function List({ title, className, id, urlAPI }) {
    const [genre, setGenre] = React.useState([])

    React.useEffect(() => {
        const getGenreMovie = async () => {
            const { data } = await tmdb.get(urlAPI)
            setGenre(data.genres)
        }

        getGenreMovie()
    }, [])

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
                    {genre.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className='border-b-[1px] border-gray-300/50 px-2 pt-2 pb-1'
                            >
                                <div className='montserrat flex flex-wrap justify-between gap-3'>
                                    <h2 className='text-md line-clamp-1 font-medium text-gray-800'>
                                        {item.name}
                                    </h2>
                                    <h2 className='text-md font-medium text-blue-600'>
                                        -
                                    </h2>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )
}
