import React from 'react'

import '@/styles/_home.scss'
import Netray from '@/layouts/Netray'
import List from '@/components/list/List'
import {PopularMV, NowPlayMV, PopularTV, TrendMV, TrendTV, UpcomingMV} from '@/components/movie/MovieList'

export default function Home() {

    return (
        <Netray
            title='Netray Official — Bluray Film'
            kw='netray home, netray beranda, netray id home, netray beranda indonesia'
            desc='Netray Official adalah website yang menyediakan kumpulan film-film baik yang yang terbaru maupun yang sudah lama dengan pilihan resolusi yang bisa disesuaikan'
            ogUrl={''}
            ogType={''}
            ogTitle={''}
            ogDesc={''}
            twitTitle={''}
        >
            <main className='home-component'>
                <section id='container_home'>
                    <article id='trending_movie'
                        className='movie-container space-y-8 mb-6'
                    >
                        <div className='heading-card flex flex-wrap gap-4 w-full items-center justify-between'>
                            <h1 className='montserrat border-l-4 border-blue-600 pl-3 font-semibold'>
                                Trending Movies
                            </h1>
                            <button className='inter rounded-[5px] 5xs:w-full bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:outline-none'>
                                Lihat Semua
                            </button>
                        </div>
                        <div className='container-list-card'>
                            <TrendMV />
                        </div>
                    </article>
                    <article id='trending_tv'
                        className='movie-container space-y-8 mb-14'
                    >
                        <div className='heading-card flex flex-wrap gap-4 w-full items-center justify-between'>
                            <h1 className='montserrat border-l-4 border-blue-600 pl-3 font-semibold'>
                                Trending Series
                            </h1>
                            <button className='inter rounded-[5px] 5xs:w-full bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:outline-none'>
                                Lihat Semua
                            </button>
                        </div>
                        <div className='container-list-card'>
                            <TrendTV />
                        </div>
                    </article>
                    <article id='popular_tv'
                        className='movie-container space-y-8 mb-14'
                    >
                        <div className='heading-card montserrat'>
                            <h1 className='text-center text-gray-800 font-bold text-[2.5rem]'>
                                ● Popular Lately ●
                            </h1>
                        </div>
                        <div className='container-list-card'>
                            <PopularTV />
                        </div>
                    </article>
                    <section className='flex sm:flex-row flex-col gap-7'>
                        <List title='Genres' id='left-section' className='list-container sm:w-[30%] w-full sm:order-2 order-1 space-y-2' urlAPI='/genre/movie/list' />
                        <div id='right_section'
                            className='section-container sm:w-[70%] w-full sm:order-1 order-2'
                        >
                            <article id='upcoming_movie'
                            className='movie-container space-y-8 mb-14'>
                                <div className='heading-card montserrat'>
                                    <h1 className=' text-black font-semibold'>
                                        Upcoming Movie
                                    </h1>
                                </div>
                                <div className='container-list-card'>
                                    <UpcomingMV />
                                </div>
                            </article>
                            <article id='now_playing_movie'
                            className='movie-container space-y-8 mb-14'>
                                <div className='heading-card montserrat'>
                                    <h1 className='text-black font-semibold'>
                                        Now Playing Movie
                                    </h1>
                                </div>
                                <div className='container-list-card'>
                                    <NowPlayMV />
                                </div>
                            </article>
                            <article id='popular_movie'
                            className='movie-container space-y-8'>
                                <div className='heading-card montserrat'>
                                    <h1 className='text-black font-semibold'>
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
