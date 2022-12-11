import React from "react"
import tmdb from '../../api/tmbd'
import { ForwardIcon } from '@heroicons/react/24/outline'

import "@/styles/component/list/_list.scss"

export default function List({title, className, id, urlAPI}) {

    const [genre, setGenre] = React.useState([]);

    React.useEffect(() => {
        const getGenreMovie = async () => {
            const { data } = await tmdb.get(urlAPI)
            setGenre(data.genres)
        }

        getGenreMovie()
    }, [])
    
    return (
        <aside id={id} className={className}>
            <div className='heading-card flex flex-wrap gap-4 w-full items-center justify-between montserrat'>
                <h1 className='poppins text-gray-900 font-bold text-[1.5rem]'>
                    {title}
                </h1>
                <ForwardIcon className='w-6 h-6 text-gray-700' />
            </div>
            <nav className="list-wrapper">
                <ul className='list-none sm:h-[21rem] h-[11rem] overflow-y-scroll'>
                {
                    genre.map((item, index) => {
                        return (
                            <li key={index} className='px-2 pt-2 pb-1 border-b-[1px] border-gray-300/50'>
                                <div className='flex flex-wrap gap-3 justify-between montserrat'>
                                    <h2 className='text-md font-medium text-gray-800 line-clamp-1'>{item.name}</h2>
                                    <h2 className='text-md font-medium text-blue-600'>-</h2>
                                </div>
                            </li>
                        )
                    })
                }
                </ul>
            </nav>
        </aside>
    )
}