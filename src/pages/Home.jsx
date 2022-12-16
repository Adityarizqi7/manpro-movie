import React from 'react'

import '@/styles/_home.scss'
import Netray from '@/layouts/Netray'
import List from '@/components/list/List'
import {
    PopularMV,
    NowPlayMV,
    PopularTV,
    TrendMV,
    TrendTV,
    UpcomingMV,
} from '@/components/movie/MovieService'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <Netray
            title='Netray Official — Bluray Film'
            kw='netray home, netray beranda, netray id home, netray beranda indonesia'
            desc='Netray Official. Tempat terbaik dan menyenangkan untuk mencari dan menonton film atau tv series favorit anda. Ribuan film sudah siap untuk memanjakan hari-hari anda.'
            ogUrl={''}
            ogType={''}
            ogTitle={''}
            ogDesc={''}
            twitTitle={''}
        >
            <main className='home-component'>
                <section id='container_home'>
                    <article
                        id='trending_movie'
                        className='movie-container mb-6 space-y-8'
                    >
                        <div className='heading-card w-full'>
                            <h1 className='montserrat border-l-4 border-blue-600 pl-3 font-semibold'>
                                Trending Movies
                            </h1>
                        </div>
                        <div className='container-list-card'>
                            <TrendMV />
                        </div>
                    </article>
                    <article
                        id='trending_tv'
                        className='movie-container mb-14 space-y-8'
                    >
                        <div className='heading-card w-full'>
                            <h1 className='montserrat border-l-4 border-blue-600 pl-3 font-semibold'>
                                Trending Series
                            </h1>
                        </div>
                        <div className='container-list-card'>
                            <TrendTV />
                        </div>
                    </article>
                    <article
                        id='popular_tv'
                        className='movie-container mb-14 space-y-8'
                    >
                        <div className='heading-card montserrat'>
                            <h1 className='text-center text-[2.5rem] font-bold text-gray-800'>
                                ● Popular Lately ●
                            </h1>
                        </div>
                        <div className='container-list-card'>
                            <PopularTV />
                        </div>
                    </article>
                    <section className='flex flex-col gap-7 sm:flex-row'>
                        <List
                            title='Genres'
                            id='left-section'
                            className='list-container order-1 w-full space-y-2 sm:order-2 sm:w-[30%]'
                            urlAPI='/genre/movie/list'
                        />
                        <div
                            id='right_section'
                            className='section-container order-2 w-full sm:order-1 sm:w-[70%]'
                        >
                            <article
                                id='upcoming_movie'
                                className='movie-container mb-14 space-y-8'
                            >
                                <div className='heading-card montserrat flex flex-wrap gap-4 justify-between items-center'>
                                    <h1 className=' font-semibold text-black'>
                                        Upcoming Movie
                                    </h1>
                                    <Link to={'/upcoming-movies'}>
                                        <h2 className='font-normal text-gray-600 text-sm hover:text-blue-600'>
                                            See more
                                        </h2>
                                    </Link>
                                </div>
                                <div className='container-list-card cursor-grab'>
                                    <UpcomingMV />
                                </div>
                            </article>
                            <article
                                id='now_playing_movie'
                                className='movie-container mb-14 space-y-8'
                            >
                                <div className='heading-card montserrat'>
                                    <h1 className='font-semibold text-black'>
                                        Now Playing Movie
                                    </h1>
                                </div>
                                <div className='container-list-card'>
                                    <NowPlayMV />
                                </div>
                            </article>
                            <article
                                id='popular_movie'
                                className='movie-container space-y-8'
                            >
                                <div className='heading-card montserrat'>
                                    <h1 className='font-semibold text-black'>
                                        Popular Movie
                                    </h1>
                                </div>
                                <div className='container-list-card'>
                                    <PopularMV />
                                </div>
                            </article>
                        </div>
                    </section>
                </section>
            </main>
        </Netray>
    )
}
