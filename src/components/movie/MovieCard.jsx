import React from 'react'
import { Link } from 'react-router-dom'
import { Popover } from '@headlessui/react'
import { GlobalContext } from '@/routes/Router'
import { PlayIcon } from '@heroicons/react/24/solid'

import '@/styles/component/movie/_moviecard.scss'
import 'react-loading-skeleton/dist/skeleton.css'

const getPoster = (size, path) => {
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
}) {
    const theme = React.useContext(GlobalContext).theme

    const renderTheme = (theme, dark = '', light = '') => {
        if (theme === 'dark') {
            return dark
        }
    }

    return (
        <Link to={`/movie/${id}`}>
            <div className='wrapper-card group cursor-pointer'>
                {
                    <div className='image-card rouned-[0.5rem] relative h-[25%]'>
                        <img
                            src={`${getPoster('w500', poster_path)}`}
                            alt={`${title || original_name}`}
                            className='h-[25%] w-full rounded-[0.5rem] object-cover object-top'
                        />
                        <div className='overlay absolute top-0 h-full w-full rounded-[0.5rem] transition-colors group-hover:bg-black/60'>
                            <div className='flex h-full flex-col items-center'>
                                <PlayIcon className='icon-play my-auto mx-auto w-[18vw] scale-0 rounded-full bg-blue-600 p-2 text-white transition-transform group-hover:scale-100 sm:w-[3.5rem]' />
                            </div>
                        </div>
                        <div className='rate-year absolute bottom-0 h-[3.5rem] w-full rounded-b-[0.5rem] bg-gradient-to-b from-gray-600/0 via-gray-800/50 to-gray-900/80'>
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
                }
                <h1
                    className={`${renderTheme(
                        theme,
                        'text-white',
                        'text-slate-800'
                    )} montserrat mt-3 text-[15px] font-semibold group-hover:text-blue-600`}
                >
                    {title || original_name}
                </h1>
            </div>
        </Link>
    )
}

function MovieCard2({ id, title, poster_path, classOverlay, classWrapper }) {
    return (
        <Link to={`movie/${id}`}>
            <div className={`${classWrapper} wrapper-card group`}>
                <div className='image-card relative'>
                    <img
                        src={`${getPoster('w500', poster_path)}`}
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
        </Link>
    )
}

function SeriesCard({
    id,
    poster_path,
    vote_average,
    original_name,
    first_air_date,
}) {
    const theme = React.useContext(GlobalContext).theme

    const renderTheme = (theme, dark = '', light = '') => {
        if (theme === 'dark') {
            return dark
        }
    }

    return (
        <Link to={`/series/${id}`}>
            <div className='wrapper-card group cursor-pointer'>
                {
                    <div className='image-card relative h-[25%]'>
                        <img
                            src={`${getPoster('w500', poster_path)}`}
                            alt={`${original_name}`}
                            className='h-[25%] w-full rounded-[0.5rem] object-cover object-top'
                        />
                        <div className='overlay absolute top-0 h-full w-full rounded-[0.5rem] transition-colors group-hover:bg-black/60'>
                            <div className='flex h-full flex-col items-center'>
                                <PlayIcon className='icon-play my-auto mx-auto w-[18vw] scale-0 rounded-full bg-blue-600 p-2 text-white transition-transform group-hover:scale-100 sm:w-[3.5rem]' />
                            </div>
                        </div>
                        <div className='rate-year absolute bottom-0 h-[3.5rem] w-full rounded-b-[0.5rem] bg-gradient-to-b from-gray-600/0 via-gray-800/50 to-gray-900/80'>
                            <div className='inter ml-3 mt-4 flex items-center gap-3'>
                                <h2 className='rounded-[5px] bg-yellow-400 py-[2px] px-[10px] text-sm'>
                                    {vote_average.toFixed(1)}
                                </h2>
                                <h2 className='text-sm text-white'>
                                    {first_air_date.substring(0, 4)}
                                </h2>
                            </div>
                        </div>
                    </div>
                }
                <h1
                    className={`${renderTheme(
                        theme,
                        'text-white',
                        'text-slate-800'
                    )} montserrat mt-3 text-[15px] font-semibold group-hover:text-blue-600`}
                >
                    {original_name}
                </h1>
            </div>
        </Link>
    )
}

function SeriesCard2({
    id,
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
                        src={`${getPoster('w1280', backdrop_path)}`}
                        alt={`${original_name}`}
                        className='h-[43vw] w-full object-cover'
                    />
                    <div className='overlay-card-two absolute top-0 z-10 flex h-full w-full flex-col justify-center'>
                        <div className='flex flex-col items-start px-6 sm:hidden'>
                            <Link to={`series/${id}`}>
                                <PlayIcon className='icon-play w-[2.5rem] rounded-full bg-white p-2 text-blue-600' />
                            </Link>
                        </div>
                        <div className='montserrat hidden flex-col items-start px-6 sm:flex'>
                            <h1 className='text-[2.5rem] font-semibold text-white'>
                                {original_name}
                            </h1>
                            <div className='flex gap-x-3'>
                                <Link
                                    to={`series/${id}`}
                                    className='bg-white py-3 px-5 font-medium text-black hover:bg-opacity-80 focus:outline-none'
                                >
                                    Detail
                                </Link>
                                <Popover.Button className='border border-gray-300 py-3 px-6 font-medium text-white hover:border-blue-300 focus:outline-none'>
                                    Watch Trailer
                                </Popover.Button>
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
                            className='aspect-video h-[43vw] w-full'
                            src={`https://www.youtube.com/embed/${key_trailer}?showinfo=0&enablejsapi=1&origin=https://netray.netlify.app`}
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

export { MovieCard, SeriesCard, SeriesCard2, MovieCard2 }
