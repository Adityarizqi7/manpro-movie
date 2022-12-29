import React from 'react'
import tmbd from '@/api/tmbd'
import Skeleton from 'react-loading-skeleton'
import LightGallery from 'lightgallery/react'
import lgZoom from 'lightgallery/plugins/zoom'
import { GlobalContext } from '@/routes/Router'
import lgVideo from 'lightgallery/plugins/video'
import lgShare from 'lightgallery/plugins/share'
import lgRotate from 'lightgallery/plugins/rotate'
import { useParams, Link } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import lgFullscreen from 'lightgallery/plugins/fullscreen'
import { PhotoIcon, PlayIcon } from '@heroicons/react/24/outline'

import 'lightgallery/scss/lightgallery-bundle.scss'
import 'react-loading-skeleton/dist/skeleton.css'
import '@/styles/component/movie/_detailmovies.scss'

import Nevrays from '@/layouts/Nevrays'

const DetailMovie = () => {
    const [loading, setLoading] = useState(false)

    const [detailMV, setDetailMV] = useState(null)
    const [trailerMV, setTrailerMV] = useState([])
    const { movieId } = useParams()

    const theme = React.useContext(GlobalContext).theme

    const renderTheme = React.useCallback((theme, dark = '', light = '') => {
        if (theme === 'dark') {
            return dark
        }
        return light
    }, [])

    const getDetailMovie = useCallback(async () => {
        try {
            setLoading(true)
            const { data, status } = await tmbd.get(`/movie/${movieId}`)
            if (status === 200) {
                setLoading(false)
                setDetailMV(data)
            }
        } catch {
            setLoading(false)
        }

        try {
            setLoading(true)
            const { data, status } = await tmbd.get(
                `/movie/${movieId}/videos`,
                {
                    params: {
                        append_to_response: 'videos',
                    },
                }
            )
            if (status === 200) {
                setLoading(false)
                setTrailerMV(
                    data.results
                        .filter((value) => value.name === 'Official Trailer')
                        .map((item) => {
                            return item.key
                        })
                )
            }
        } catch {
            setLoading(false)
        }
    }, [movieId])

    useEffect(() => {
        getDetailMovie()
    }, [getDetailMovie])

    return (
        <Nevrays
            title={
                loading
                    ? 'Loading'
                    : `${detailMV?.original_title} (${
                          detailMV?.release_date.split('-')[0]
                      })` + ' - Nevrays'
            }
            kw={detailMV?.original_title + ' nevrays'}
            desc='Nevrays Official adalah website yang menyediakan kumpulan film-film baik yang yang terbaru maupun yang sudah lama dengan pilihan resolusi yang bisa disesuaikan'
            ogUrl={''}
            ogType={''}
            ogTitle={''}
            ogDesc={''}
            twitTitle={''}
        >
            <main
                className={`${renderTheme(
                    theme,
                    'bg-dark-theme'
                )} detail-movie-component`}
            >
                {/* banner */}
                <div className='jumbotron-image'>
                    {loading && <Skeleton height={500} />}
                    {!loading && (
                        <img
                            className='h-[200px] w-full overflow-hidden object-cover object-top shadow-lg sm:h-[500px]'
                            src={`https://image.tmdb.org/t/p/original/${detailMV?.backdrop_path}`}
                            alt={`${detailMV?.original_title}`}
                        />
                    )}
                </div>
                {/* contents */}
                <div className='content-detail-movie lg:flex lg:gap-7'>
                    {/* poster  */}
                    <div className='poster-content hidden w-[30%] rounded-md lg:block'>
                        {loading ? (
                            <Skeleton height={500} />
                        ) : (
                            <img
                                className='object-cover'
                                src={`https://image.tmdb.org/t/p/w500/${detailMV?.poster_path}`}
                                alt={`${detailMV?.original_title}`}
                            />
                        )}
                    </div>
                    <div className='wrapper-content w-full space-y-8 lg:w-[70%]'>
                        {/* head title  */}
                        <div className='head-title-content'>
                            <h2
                                className={`${renderTheme(
                                    theme,
                                    'text-white',
                                    'text-neutral-800'
                                )} montserrat text-[1.875rem] font-medium`}
                            >
                                {loading ? (
                                    <Skeleton width={300} height={50} />
                                ) : (
                                    <>
                                        <span>{`${detailMV?.original_title}`}</span>
                                        <span
                                            className={`${renderTheme(
                                                theme,
                                                'text-gray-400',
                                                'text-gray-600'
                                            )} ml-2 font-light`}
                                        >
                                            (
                                            {`${
                                                detailMV?.release_date.split(
                                                    '-'
                                                )[0]
                                            }`}
                                            )
                                        </span>
                                    </>
                                )}
                            </h2>
                            <div className='mt-2 flex flex-wrap items-center gap-3'>
                                {loading ? (
                                    <Skeleton
                                        height={30}
                                        width={100}
                                        count={3}
                                        containerClassName={
                                            'flex flex-wrap gap-4 last:gap-0'
                                        }
                                    />
                                ) : (
                                    <div className='div flex items-center gap-3'>
                                        <div className='poppins flex flex-wrap gap-4'>
                                            {detailMV?.genres.map(
                                                (genre, idx) => (
                                                    <Link
                                                        key={idx}
                                                        to={`/genre/${genre.id}/movie`}
                                                    >
                                                        <h3
                                                            className='font-medium text-blue-800 hover:text-blue-500'
                                                            key={`detail-genre-${idx}`}
                                                        >
                                                            #{genre.name}
                                                        </h3>
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                                <span
                                    className={`${renderTheme(
                                        theme,
                                        'text-white',
                                        'text-black'
                                    )}`}
                                >
                                    ·
                                </span>
                                <h3
                                    className={`${renderTheme(
                                        theme,
                                        'text-white',
                                        'text-black'
                                    )} montserrat`}
                                >
                                    {loading ? (
                                        <Skeleton
                                            height={30}
                                            width={50}
                                            containerClassName={
                                                'flex flex-wrap gap-4 last:gap-0'
                                            }
                                        />
                                    ) : detailMV?.runtime === '' ? (
                                        '0m'
                                    ) : (
                                        `${detailMV?.runtime}m`
                                    )}
                                </h3>
                            </div>
                            <LightGallery
                                speed={500}
                                mode='lg-fade'
                                plugins={[
                                    lgZoom,
                                    lgVideo,
                                    lgFullscreen,
                                    lgShare,
                                ]}
                                download={true}
                                autoplayFirstVideo={false}
                            >
                                <button
                                    className={`${
                                        trailerMV.length === 0 &&
                                        'pointer-events-none'
                                    } montserrat mt-3 flex cursor-pointer items-center gap-x-1 text-blue-600`}
                                    data-lg-size='1280-720'
                                    data-iframe={true}
                                    data-src={`https://www.youtube.com/embed/${trailerMV}`}
                                    data-poster={`https://image.tmdb.org/t/p/w500/${detailMV?.backdrop_path}`}
                                >
                                    {trailerMV.length === 0 ? (
                                        <h2 className='text-[0.95rem] font-normal'>
                                            Tidak ada trailer
                                        </h2>
                                    ) : (
                                        <>
                                            <PlayIcon className='h-4 w-4' />
                                            <h2 className='text-[0.95rem] font-normal'>
                                                Play Opening Credits
                                            </h2>
                                        </>
                                    )}
                                </button>
                            </LightGallery>
                        </div>
                        {loading ? (
                            <Skeleton width={180} height={45} />
                        ) : (
                            <h2
                                className={`${
                                    detailMV?.tagline === ''
                                        ? 'hidden'
                                        : `${renderTheme(
                                              theme,
                                              'text-gray-300',
                                              'text-gray-700'
                                          )} block`
                                } text-[6vw] font-light italic sm:text-[1.5rem]`}
                            >
                                '{detailMV?.tagline}'
                            </h2>
                        )}
                        {/* Poster on Mobile */}
                        {/* informations  */}
                        <div className='wrapper-information'>
                            <LightGallery
                                speed={500}
                                mode='lg-fade'
                                plugins={[
                                    lgZoom,
                                    lgRotate,
                                    lgShare,
                                    lgFullscreen,
                                ]}
                                download={true}
                            >
                                <a
                                    data-sub-html={`<h4>${detailMV?.original_title}</h4>`}
                                    alt={`https://image.tmdb.org/t/p/w500/${detailMV?.original_title}`}
                                    data-src={`https://image.tmdb.org/t/p/w500/${detailMV?.poster_path}`}
                                    data-download={`https://image.tmdb.org/t/p/w500/${detailMV?.poster_path}`}
                                    data-download-url={true}
                                >
                                    <button
                                        className={`${renderTheme(
                                            theme,
                                            'text-white',
                                            'text-black'
                                        )} button-poster-mobile montserrat mb-3 flex items-center gap-2 rounded-md border border-blue-600/60 py-1 px-3 focus:outline-none lg:hidden`}
                                    >
                                        <PhotoIcon className='h-5 w-5' />
                                        <span>Lihat Poster</span>
                                    </button>
                                </a>
                            </LightGallery>
                            {/* description  */}
                            <div className='space-y-1'>
                                <h6
                                    className={`${renderTheme(
                                        theme,
                                        'text-gray-100',
                                        'text-black'
                                    )} poppins text-[1.125rem] font-medium`}
                                >
                                    Deskripsi Singkat
                                </h6>
                                <p
                                    className={`${renderTheme(
                                        theme,
                                        'text-gray-400',
                                        'text-neutral-700'
                                    )} inter`}
                                >
                                    {loading ? (
                                        <Skeleton height={60} />
                                    ) : (
                                        detailMV?.overview
                                    )}
                                </p>
                            </div>
                            {/* advanced information lists  */}
                            <div
                                className={`${renderTheme(
                                    theme,
                                    'text-gray-300',
                                    'text-neutral-700'
                                )} mt-6 flex flex-col gap-5`}
                            >
                                <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
                                    <h6 className='poppins min-w-[200px] text-[1rem] font-medium'>
                                        Tanggal Rilis
                                    </h6>
                                    <p className='inter'>
                                        {loading ? (
                                            <Skeleton height={30} width={150} />
                                        ) : (
                                            detailMV?.release_date
                                        )}
                                    </p>
                                </div>
                                <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
                                    <h6 className='poppins min-w-[200px] text-[1rem] font-medium'>
                                        Nilai Popularitas
                                    </h6>
                                    <p className='inter'>
                                        {loading ? (
                                            <Skeleton height={30} width={150} />
                                        ) : (
                                            detailMV?.popularity
                                        )}{' '}
                                        popularitas
                                    </p>
                                </div>
                                <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
                                    <h6 className='poppins min-w-[200px] text-[1rem] font-medium'>
                                        Perusahaan produksi film
                                    </h6>
                                    <p className='inter'>
                                        {loading ? (
                                            <Skeleton height={30} width={300} />
                                        ) : (
                                            detailMV?.production_companies.map(
                                                (company, idx) => (
                                                    <span
                                                        className='mr-1'
                                                        key={`detail-production-company-${idx}`}
                                                    >
                                                        {company.name}
                                                        {idx + 1 !==
                                                            detailMV
                                                                ?.production_companies
                                                                .length && ','}
                                                    </span>
                                                )
                                            )
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Nevrays>
    )
}

export default DetailMovie
