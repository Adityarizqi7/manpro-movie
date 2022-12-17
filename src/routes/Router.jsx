import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '@/pages/Home'
import Terms from '@/pages/Terms'
import Privacy from '@/pages/Privacy'
import NotFound from '@/pages/NotFound'
import Privacy from '@/pages/Privacy'
import DetailPage from '@/pages/DetailMovie'
import ScrollPage from '@/components/button/ScrollPage'

/* Movies Route */
import MVByGenre from '@/pages/movies/MVByGenre'
import DetailMovie from '@/pages/movies/DetailMovie'
import PopularMovie from '@/pages/movies/PopularMovie'
import UpcomingMovie from '@/pages/movies/UpcomingMovie'
import NowPlayingMovie from '@/pages/movies/NowPlayingMovie'

/* Series Route */
import OnTVSeries from '@/pages/series/OnTVSeries'
import AiringSeries from '@/pages/series/AiringSeries'
import DetailSeries from '@/pages/series/DetailSeries'
import TopRatedSeries from '@/pages/series/TopRatedSeries'

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

                <Route path='/movies/popular' element={<PopularMovie />} />
                <Route path='/movies/upcoming' element={<UpcomingMovie />} />
                <Route path='/movies/now-playing' element={<NowPlayingMovie />} />
                <Route path='/genre/:genreId/movie' element={<MVByGenre />} />

                <Route path='/series/on-the-air' element={<OnTVSeries />} />
                <Route path='/series/airing-today' element={<AiringSeries />} />
                <Route path='/series/top-rated' element={<TopRatedSeries />} />
                {/* <Route path='/genre/:genreId/series' element={<MVByGenre />} /> */}

                <Route path='*' element={<NotFound />} />
                <Route path='/privacy-policy' element={<Privacy />} />
            </Routes>
        </ScrollPage>
    )
}
