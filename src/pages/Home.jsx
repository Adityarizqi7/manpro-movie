import React from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/solid'

import '@/styles/_home.scss'
import Netray from '@/layouts/Netray'
import {PopularTV, TrendMV, TrendTV} from '@/components/movie/MovieList'

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
                            <TrendMV urlAPI='/trending/movie/week' />
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
                            <TrendTV urlAPI='/trending/tv/week' />
                        </div>
                    </article>
                    <article id='popular_tv'
                        className='movie-container space-y-8'
                    >
                        <div className='heading-card flex flex-wrap gap-4 w-full items-center justify-between montserrat'>
                            <h1 className='border-l-4 border-blue-600 text-blue-600 pl-3 font-semibold'>
                                Popular Lately
                            </h1>
                        </div>
                        <div className='container-list-card'>
                            <PopularTV urlAPI='/tv/popular' />
                        </div>
                    </article>
                </section>
            </main>
        </Netray>
    )
}
