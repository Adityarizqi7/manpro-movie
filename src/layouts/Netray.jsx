import React from 'react'
import { Helmet } from 'react-helmet'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BtnToTop from '../components/button/BtnToTop'

export default function Netray({
    title,
    key,
    desc,
    ogUrl,
    ogType,
    ogTitle,
    ogDesc,
    twitTitle,
    children,
}) {
    return (
        <>
            <Helmet>
                <title>{title}</title>

                <meta name='keywords' content={key} />
                <meta name='description' content={desc} />
                <meta property='og:url' content={ogUrl} />
                <meta property='og:type' content={ogType} />
                <meta property='og:title' content={ogTitle} />
                <meta property='og:description' content={ogDesc} />
                <meta name='twitter:title' content={twitTitle} />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossorigin
                />

                <link
                    href='https://fonts.googleapis.com/css?family=Inter:100,200,300,regular,500,600,700,800,900'
                    rel='stylesheet'
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
                    rel='stylesheet'
                ></link>
                <link
                    href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
                    rel='stylesheet'
                ></link>
            </Helmet>

            <Navbar />
            {children}
            <Footer />

            <BtnToTop />
        </>
    )
}

Netray.defaultProps = {
    title: 'Netray Official — Bluray Film',
    key: 'netray, netray id, netray indonesia',
    desc: 'Netray Official. Tempat terbaik dan menyenangkan untuk mencari dan menonton film atau tv series favorit anda. Ribuan film sudah siap untuk memanjakan hari-hari anda.',
    ogUrl: null,
    ogType: null,
    ogTitle: null,
    ogDesc: null,
    twitTitle: null,
}
