import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '@/pages/Home'
import Terms from '@/pages/Terms'
import UpcomingMovie from '@/pages/movies/UpcomingMovie'
import Privacy from '@/pages/Privacy'
import NotFound from '@/pages/NotFound'
import DetailMovie from '@/pages/movies/DetailMovie'
import DetailSeries from '@/pages/series/DetailSeries'
import ScrollPage from '@/components/button/ScrollPage'

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
                <Route path='/upcoming-movies' element={<UpcomingMovie />} />

                <Route path='*' element={<NotFound />} />
            </Routes>
        </ScrollPage>
    )
}
