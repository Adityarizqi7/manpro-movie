import React from 'react'
import { useNavigate } from 'react-router-dom'

import Netray from '../layouts/Netray'

export default function NotFound() {
    const status = null
    const navigate = useNavigate()

    return (
        <Netray
            title='404 | Halaman tidak ditemukan'
            kw='netray not found, netray halaman tidak ditemukan, netray, netray halaman tidak ditemukan'
            desc='Halaman 404'
            ogUrl={status}
            ogType={status}
            ogTitle={status}
            ogDesc={status}
            twitTitle={status}
        >
            <main className='notfound-component'>
                <div className='mx-auto px-2 py-20'>
                    <div className='poppins flex flex-col items-center gap-y-4'>
                        <h1 className='text-9xl font-bold text-blue-600'>
                            404
                        </h1>
                        <h6 className='text-black-800 mb-2 text-center text-2xl font-bold md:text-3xl'>
                            OOps, Page Not Found
                        </h6>

                        <p className='text-black-500 mb-8 text-center md:text-lg'>
                            The page you're looking for doesn't exist.
                        </p>

                        <button
                            onClick={() => navigate(-1)}
                            className='bg-blue-100 px-6 py-2 text-sm font-semibold text-blue-800 transition-colors hover:bg-blue-700/30 hover:text-blue-800'
                        >
                            Go back
                        </button>
                    </div>
                </div>
            </main>
        </Netray>
    )
}
