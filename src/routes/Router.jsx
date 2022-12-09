import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import ScrollPage from '@/components/button/ScrollPage'

export default function Router() {
    return (
        <ScrollPage>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </ScrollPage>
    )
}
