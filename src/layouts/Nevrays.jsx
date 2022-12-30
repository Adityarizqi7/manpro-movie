import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import TopBar from '../components/Navbar/Topbar'
import Footer from '../components/Footer'
import BtnToTop from '../components/button/BtnToTop'

export default React.memo( function Nevrays({
    title='Nevrays Official — Tonton Movie dan TV Show Online Sambil Nyemil',
    key='nevrays, nevrays id, nevrays indonesia',
    desc='Nevrays Official. Tempat terbaik dan menyenangkan untuk mencari dan menonton film atau tv series favorit anda. Ribuan film sudah siap untuk memanjakan hari-hari anda.',
    ogUrl,
    ogType,
    ogTitle,
    ogDesc,
    twitTitle,
    children,
}) {
    return (
        <HelmetProvider>
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
                    href='https://fonts.googleapis.com/css?family=Inter:100,200,300,regular,500,600,700,800,900&display=swap'
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

            <TopBar />
            {children}
            <Footer />

            <BtnToTop />
        </HelmetProvider>
    )
})