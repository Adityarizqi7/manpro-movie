import React from "react"
import { PlayIcon } from '@heroicons/react/24/solid'

import "@/styles/component/movie/_moviecard.scss"

const getPoster = (path, size='w500') => {
    return `https://www.themoviedb.org/t/p/${size}/${path}`
}

function MovieCard({
    poster_path,
    title,
    release_date,
    vote_average,
    original_name
}) {
    return (
        <div className='wrapper-card group cursor-pointer'>
            <div className='image-card relative'>
                <img
                    src={`${getPoster(poster_path, 'w220_and_h330_face')}`}
                    alt={`${title || original_name}`}
                    className='rounded-[0.5rem]'
                />
                <div className='overlay absolute top-0 h-full w-full rounded-[0.5rem] transition-colors group-hover:bg-black/60'>
                    <div className='flex h-full flex-col items-center'>
                        <PlayIcon className='icon-play my-auto mx-auto w-[3.5rem] scale-0 rounded-full bg-blue-600 p-2 text-white transition-transform group-hover:scale-100' />
                    </div>
                </div>
                <div className='rate-year absolute bottom-0 h-[3.5rem] w-full bg-gradient-to-b from-gray-600/0 via-gray-800/50 to-gray-900/80'>
                    <div className='inter ml-3 mt-4 flex items-center gap-3'>
                        <h2 className='rounded-[5px] bg-yellow-400 py-[2px] px-[10px] text-sm'>
                            {vote_average.toFixed(1)}
                        </h2>
                        <h2 className='text-sm text-white'>
                            {release_date?.substring(0, 4) || release_date?.substring(0, 4)}
                        </h2>
                    </div>
                </div>
            </div>
            <h1 className='montserrat mt-3 text-[15px] font-semibold text-slate-800'>
                {title || original_name}
            </h1>
        </div>
    )
}

function MovieCard2({
    backdrop_path,
    original_name,
    first_air_date,
    overview,
    key_trailer,
    name,
}) {

    const [toogleYT, setToogleYT] = React.useState(false)

    const open = () => {
        setToogleYT(!toogleYT)
    }

    return (
        <div className='wrapper-card group'>
            <div className='image-card relative'>
                <img
                    src={`${getPoster(backdrop_path, 'w1920_and_h800_multi_faces')}`}
                    alt={`${original_name}`}
                    className='object-cover w-full'
                />
                <div className='overlay-card-two absolute top-0 h-full w-full flex flex-col justify-center z-10'>
                    <div className='sm:hidden flex flex-col items-start px-6'>
                        <PlayIcon className='icon-play w-[2.5rem] rounded-full bg-white p-2 text-blue-600' />
                    </div>
                    <div className='sm:flex hidden flex-col items-start px-6 montserrat'>
                        <h1 className='text-white font-semibold text-[2.5rem]'>{original_name}</h1>
                        <div className='flex gap-x-3'>
                            <button onClick={open} className='focus:outline-none py-3 px-5 bg-white text-black font-medium'>Play</button>
                            <button className='focus:outline-none py-3 px-6 border border-gray-300 text-white font-medium'>Watch Later</button>
                        </div>
                        <div className='mt-5 space-y-1'>
                            <h3 className='text-gray-400 font-medium'>Released {first_air_date}</h3>
                            <p className='font-medium line-clamp-2 w-[40%] text-white'>{overview}</p>
                        </div>
                    </div>
                </div>
                <aside className={`${toogleYT ? "youtube-container absolute top-0 right-0 z-20 max-w-full w-full" : 'hidden'}`}>
                    <iframe className="w-full h-[33rem] aspect-video" src={`https://www.youtube.com/embed/${key_trailer}?showinfo=0&enablejsapi=1&origin=http://127.0.0.1:5173`} title={`${original_name} | ${name}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </aside>
            </div>
        </div>
    )
}

export {MovieCard, MovieCard2}