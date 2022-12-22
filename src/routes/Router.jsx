import React, { createContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '@/pages/Home'
import Terms from '@/pages/Terms'
import Privacy from '@/pages/Privacy'
import NotFound from '@/pages/NotFound'
import ScrollPage from '@/components/button/ScrollPage'

/* Movies Route */
import MVByGenre from '@/pages/movies/MVByGenre'
import DetailMovie from '@/pages/movies/DetailMovie'
import PopularMovie from '@/pages/movies/PopularMovie'
import UpcomingMovie from '@/pages/movies/UpcomingMovie'
import NowPlayingMovie from '@/pages/movies/NowPlayingMovie'

/* Series Route */
import TVByGenre from '@/pages/series/TVByGenre'
import OnTVSeries from '@/pages/series/OnTVSeries'
import AiringSeries from '@/pages/series/AiringSeries'
import DetailSeries from '@/pages/series/DetailSeries'
import TopRatedSeries from '@/pages/series/TopRatedSeries'

/* Blog Route */
import Blogs from '@/pages/blog/Blogs'
import ReadBlog from '@/pages/blog/ReadBlog'
import BlogByCategory from '@/pages/blog/BlogByCategory'

export const GlobalContext = createContext()

export default function Router() {
    const [theme, setTheme] = React.useState('light')

    return (
        <GlobalContext.Provider value={{ theme: theme, setTheme: setTheme }}>
            <ScrollPage>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/terms-of-use' element={<Terms />} />
                    <Route path='/privacy-policy' element={<Privacy />} />

                    {/* Movies and Series Page */}
                    <Route path='/movie/:movieId' element={<DetailMovie />} />
                    <Route
                        path='/series/:seriesId'
                        element={<DetailSeries />}
                    />

                    <Route
                        path='/genre/:genreId/movie'
                        element={<MVByGenre />}
                    />
                    <Route path='/series/on-the-air' element={<OnTVSeries />} />

                    <Route path='/movies/popular' element={<PopularMovie />} />
                    <Route
                        path='/movies/upcoming'
                        element={<UpcomingMovie />}
                    />
                    <Route
                        path='/movies/now-playing'
                        element={<NowPlayingMovie />}
                    />

                    <Route
                        path='/series/top-rated'
                        element={<TopRatedSeries />}
                    />
                    <Route
                        path='/genre/:genreId/series'
                        element={<TVByGenre />}
                    />
                    <Route
                        path='/series/airing-today'
                        element={<AiringSeries />}
                    />

                    {/* Blog Page */}
                    <Route path='/blogs' element={<Blogs />} />
                    <Route
                        path='/blogs/:slugCategory'
                        element={<BlogByCategory />}
                    />
                    <Route
                        path='/blogs/:slugCategory/:slug'
                        element={<ReadBlog />}
                    />

                    <Route path='*' element={<NotFound />} />
                </Routes>
            </ScrollPage>
        </GlobalContext.Provider>
    )
}
