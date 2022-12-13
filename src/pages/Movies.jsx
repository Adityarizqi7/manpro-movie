import React from 'react'

import '@/styles/_movies.scss'
import Netray from '@/layouts/Netray'
import List from '@/components/list/List'

export default function Movies() {
    return (
        <Netray
            title='Movies - Netray'
            kw='movies home, movies beranda, movies id home, movies beranda indonesia'
            desc='Movies adalah Halaman kumpulan movie-movie yang disediakan oleh Netray.'
            ogUrl={''}
            ogType={''}
            ogTitle={''}
            ogDesc={''}
            twitTitle={''}
        >
            <main className='movies-component'>
                <section id='container_movies'>
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
                                id='movie_all'
                                className='movie-container mb-14 space-y-8'
                            >
                                <div className='heading-card montserrat'>
                                    <h1 className='font-semibold text-black'>
                                        Movies
                                    </h1>
                                </div>
                                <div className='container-list-card'>

                                </div>
                            </article>
                        </div>
                    </section>
                </section>
            </main>
        </Netray>
    )
}
