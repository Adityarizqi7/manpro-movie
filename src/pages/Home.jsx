import React from 'react'
import { GlobalContext } from '@/routes/Router'

import '@/styles/_home.scss'
import Nevrays from '@/layouts/Nevrays'
import List from '@/components/list/List'
import {
    PopularMV,
    NowPlayMV,
    PopularTV,
    TrendMV,
    TrendTV,
    UpcomingMV,
} from '@/components/content/ContentService'
import { Link } from 'react-router-dom'

export default function Home() {

    const theme = React.useContext(GlobalContext).theme

    const renderTheme = React.useCallback((theme, dark = '', light = '') => {
        if (theme === 'dark') {
            return dark
        }
        return light
    }, [])

    return (
        <Nevrays
            title='Nevrays — Tonton Movie dan TV Show Online Sambil Nyemil'
            kw='nevrays home, nevrays beranda, nevrays id home, nevrays beranda indonesia'
            desc='Nevrays Official. Tempat terbaik dan menyenangkan untuk mencari dan menonton film atau tv series favorit anda. Ribuan film sudah siap untuk memanjakan hari-hari anda.'
            ogUrl={''}
            ogType={''}
            ogTitle={''}
            ogDesc={''}
            twitTitle={''}
        >
            <main
                className={`${renderTheme(
                    theme,
                    'bg-dark-theme'
                )} home-component`}
            >
                <section id='container_home'>
                    <article
                        id='trending_movie'
                        className='movie-container mb-6 space-y-8'
                    >
                        <div className='heading-card w-full'>
                            <h1
                                className={`${renderTheme(
                                    theme,
                                    'text-white'
                                )} montserrat border-l-4 border-blue-600 pl-3 font-semibold`}
                            >
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
                            <h1
                                className={`${renderTheme(
                                    theme,
                                    'text-white'
                                )} montserrat border-l-4 border-blue-600 pl-3 font-semibold`}
                            >
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
                            <h1
                                className={`${renderTheme(
                                    theme,
                                    'text-white',
                                    'text-gray-800'
                                )} text-center sm:text-[2.5rem] text-[6vw] font-bold`}
                            >
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
                                <div className='heading-card montserrat flex flex-wrap items-center justify-between gap-4'>
                                    <h1
                                        className={`${renderTheme(
                                            theme,
                                            'text-white',
                                            'text-black'
                                        )} font-semibold`}
                                    >
                                        Upcoming Movie
                                    </h1>
                                    <h2
                                            className={`${renderTheme(
                                                theme,
                                                'text-gray-200',
                                                'text-gray-600'
                                            )} text-sm font-normal hover:text-blue-600`}
                                        >
                                        <Link to={'/movies/upcoming'}>
                                            See all
                                        </Link>
                                    </h2>
                                </div>
                                <div className='container-list-card cursor-grab'>
                                    <UpcomingMV />
                                </div>
                            </article>
                            <article
                                id='now_playing_movie'
                                className='movie-container mb-14 space-y-8'
                            >
                                <div className='heading-card montserrat flex flex-wrap items-center justify-between gap-4'>
                                    <h1
                                        className={`${renderTheme(
                                            theme,
                                            'text-white',
                                            'text-black'
                                        )} font-semibold`}
                                    >
                                        Now Playing Movie
                                    </h1>
                                    <h2
                                        className={`${renderTheme(
                                            theme,
                                            'text-gray-200',
                                            'text-gray-600'
                                        )} text-sm font-normal hover:text-blue-600`}
                                    >
                                        <Link to={'/movies/now-playing'}>
                                            See all
                                        </Link>
                                    </h2>
                                </div>
                                <div className='container-list-card'>
                                    <NowPlayMV />
                                </div>
                            </article>
                        </div>
                    </section>
                </section>
            </main>
        </Nevrays>
    )
}
