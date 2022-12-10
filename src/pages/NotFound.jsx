import React from 'react'
import Netray from '../layouts/Netray'

export default function NotFound() {
    const status = null

    return (
        <Netray
            title='404 | Halaman tidak ditemukan'
            kw='netray not found, netray halaman tidak ditemukan, netray id home, netray halaman tidak ditemukan indonesia'
            desc='Halaman 404'
            ogUrl={status}
            ogType={status}
            ogTitle={status}
            ogDesc={status}
            twitTitle={status}
        >
            <main className='notfound-component'>
                <div className="px-40 py-20 bg-grey rounded-md shadow-xl">
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-blue-600 text-9xl">
                            404
                        </h1>
                        <h6 className="mb-2 text-2xl font-bold text-center text-black-800 md:text-3xl">
                            <span className="text-red-500">
                                Oops!
                            </span>
                            Page Not Found
                        </h6>

                        <p className="mb-8 text-center text-black-500 md:text-lg">
                            The page you're looking for doesn't exist.
                        </p>

                        <a
                            href="#"
                            className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
                            >Go home
                        </a>
                    </div>
                </div>
            </main>
        </Netray>
    )
}
