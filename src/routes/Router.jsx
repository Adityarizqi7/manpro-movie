import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import Privacy from '@/pages/Privacy'
import DetailPage from '@/pages/DetailMovie'
import ScrollPage from '@/components/button/ScrollPage'

export default function Router() {
    return (
        <ScrollPage>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/detail/:movieId' element={<DetailPage />} />
                <Route path='*' element={<NotFound />} />
                <Route path='/privacy-policy' element={<Privacy />} />
            </Routes>
        </ScrollPage>
    )
}
