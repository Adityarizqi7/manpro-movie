import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '@/pages/Home'
import Terms from '@/pages/Terms'
import Privacy from '@/pages/Privacy'
import NotFound from '@/pages/NotFound'
import MVByGenre from '@/pages/movies/MVByGenre'
import DetailMovie from '@/pages/movies/DetailMovie'
import DetailSeries from '@/pages/series/DetailSeries'
import ScrollPage from '@/components/button/ScrollPage'
import PopularMovie from '@/pages/movies/PopularMovie'
import UpcomingMovie from '@/pages/movies/UpcomingMovie'
import NowPlayingMovie from '@/pages/movies/NowPlayingMovie'

export default function Router() {
    return (
        <ScrollPage>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/terms-of-use' element={<Terms />} />
                <Route path='/privacy-policy' element={<Privacy />} />
                
                {/* Movies Page */}
                <Route path='/movie/:movieId' element={<DetailMovie />} />
                <Route path='/series/:seriesId' element={<DetailSeries />} />

                <Route path='/popular-movies' element={<PopularMovie />} />
                <Route path='/upcoming-movies' element={<UpcomingMovie />} />
                <Route path='/now-playing-movies' element={<NowPlayingMovie />} />

                <Route path='/genre/:genreId/movie' element={<MVByGenre />} />

                <Route path='*' element={<NotFound />} />
            </Routes>
        </ScrollPage>
    )
}
