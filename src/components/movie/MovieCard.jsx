import React from 'react'
import { Popover } from '@headlessui/react'
import { PlayIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

import '@/styles/component/movie/_moviecard.scss'

const getPoster = (path, size = 'w500') => {
    return `https://www.themoviedb.org/t/p/${size}/${path}`
}

function MovieCard({
    id,
    title,
    poster_path,
    release_date,
    vote_average,
    original_name,
    first_air_date,
    ...restProps
}) {
    return (
        <Link to={`/detail/${id}`}>
            <div className='wrapper-card group cursor-pointer'>
                <div className='image-card relative'>
                    <img
                        src={`${getPoster(poster_path, 'w220_and_h330_face')}`}
                        alt={`${title || original_name}`}
                        className='w-full rounded-[0.5rem] object-cover'
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
                                {release_date?.substring(0, 4) ||
                                    first_air_date?.substring(0, 4)}
                            </h2>
                        </div>
                    </div>
                </div>
                <h1 className='montserrat mt-3 text-[15px] font-semibold text-slate-800 group-hover:text-blue-600'>
                    {title || original_name}
                </h1>
            </div>
        </Link>
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
    return (
        <div className='wrapper-card group'>
            <Popover>
                <div className='image-card relative'>
                    <img
                        src={`${getPoster(
                            backdrop_path,
                            'w1920_and_h800_multi_faces'
                        )}`}
                        alt={`${original_name}`}
                        className='w-full object-cover'
                    />
                    <div className='overlay-card-two absolute top-0 z-10 flex h-full w-full flex-col justify-center'>
                        <div className='flex flex-col items-start px-6 sm:hidden'>
                            <PlayIcon className='icon-play w-[2.5rem] rounded-full bg-white p-2 text-blue-600' />
                        </div>
                        <div className='montserrat hidden flex-col items-start px-6 sm:flex'>
                            <h1 className='text-[2.5rem] font-semibold text-white'>
                                {original_name}
                            </h1>
                            <div className='flex gap-x-3'>
                                <Popover.Button className='bg-white py-3 px-5 font-medium text-black focus:outline-none'>
                                    Play
                                </Popover.Button>
                                <button className='border border-gray-300 py-3 px-6 font-medium text-white focus:outline-none'>
                                    Watch Later
                                </button>
                            </div>
                            <div className='mt-5 space-y-1'>
                                <h3 className='font-medium text-gray-400'>
                                    Released {first_air_date}
                                </h3>
                                <p className='line-clamp-2 w-[40%] font-medium text-white'>
                                    {overview}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Popover.Panel className='youtube-container absolute top-0 right-0 z-20 w-full max-w-full'>
                        <iframe
                            className='aspect-video h-[33rem] w-full'
                            src={`https://www.youtube.com/embed/${key_trailer}?showinfo=0&enablejsapi=1&origin=http://127.0.0.1:5173`}
                            title={`${original_name} | ${name}`}
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                        ></iframe>
                    </Popover.Panel>
                </div>
            </Popover>
        </div>
    )
}

function MovieCard3({ title, poster_path, classOverlay }) {
    return (
        <div className='wrapper-card group cursor-pointer'>
            <div className='image-card relative'>
                <img
                    src={`${getPoster(poster_path, 'w220_and_h330_face')}`}
                    alt={`${title}`}
                    className='w-full object-cover'
                />
                <div
                    className={`${classOverlay} overlay absolute top-0 h-full w-full rounded-[0.5rem] transition-colors group-hover:bg-black/60`}
                >
                    <div className='flex h-full flex-col items-center'>
                        <PlayIcon className='icon-play my-auto mx-auto w-[2.5rem] scale-0 rounded-full bg-blue-600 p-2 text-white transition-transform group-hover:scale-100' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { MovieCard, MovieCard2, MovieCard3 }
