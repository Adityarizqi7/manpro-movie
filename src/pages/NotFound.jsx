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
            <main className='notfound-component'></main>
        </Netray>
    )
}
