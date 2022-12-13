import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '@/pages/Home'
import Terms from '@/pages/Terms'
import Movies from '@/pages/Movies'
import Privacy from '@/pages/Privacy'
import NotFound from '@/pages/NotFound'
import ScrollPage from '@/components/button/ScrollPage'

export default function Router() {
    return (
        <ScrollPage>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/terms-of-use' element={<Terms />} />
                <Route path='/privacy-policy' element={<Privacy />} />
                
                {/* Movies Page */}
                <Route path='/upcoming-movies' element={<Movies />} />

                <Route path='*' element={<NotFound />} />
            </Routes>
        </ScrollPage>
    )
}
