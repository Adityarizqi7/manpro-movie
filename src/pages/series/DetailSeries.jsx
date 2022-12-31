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
import ProgressiveImage from 'react-progressive-image'
import { useCallback, useEffect, useState } from 'react'
import lgFullscreen from 'lightgallery/plugins/fullscreen'
import { PhotoIcon, PlayIcon } from '@heroicons/react/24/outline'

import 'react-loading-skeleton/dist/skeleton.css'
import 'lightgallery/scss/lightgallery-bundle.scss'
import '@/styles/component/series/_detailseries.scss'

import Nevrays from '@/layouts/Nevrays'

const DetailSeries = () => {
    const [loading, setLoading] = useState(false)

    const [detailTV, setDetailTV] = useState(null)
    const [trailerTV, setTrailerTV] = useState([])
    const { seriesId } = useParams()

    const theme = React.useContext(GlobalContext).theme

    const renderTheme = React.useCallback((theme, dark = '', light = '') => {
        if (theme === 'dark') {
            return dark
        }
        return light
    }, [])

    const getDetailSeries = useCallback(async () => {
        try {
            setLoading(true)
            const { data, status } = await tmbd.get(`/tv/${seriesId}`)

            if (status === 200) {
                setLoading(false)
                setDetailTV(data)
            }
        } catch {
            setLoading(false)
        }

        try {
            setLoading(true)
            const { data, status } = await tmbd.get(`/tv/${seriesId}/videos`, {
                params: {
                    append_to_response: 'videos',
                },
            })
            if (status === 200) {
                setLoading(false)
                setTrailerTV(
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
    }, [])

    const getPoster = ((size, path) => {
        return `https://image.tmdb.org/t/p/${size}/${path}`
    })    

    useEffect(() => {
        getDetailSeries()
    }, [getDetailSeries])

    return (
        <Nevrays
            title={`${loading ? 'Loading' : detailTV?.original_name} - Nevrays`}
            kw={detailTV?.original_title + ' nevrays'}
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
                )} detail-series-component`}
            >
                {/* banner */}
                <div className='jumbotron-image'>
                    {loading ? <Skeleton height={500} />
                        :
                        <ProgressiveImage src={ detailTV?.backdrop_path === null ? BgNull : getPoster('original', detailTV?.backdrop_path) } placeholder={ detailTV?.backdrop_path === null ? BgNull : getPoster('original', detailTV?.backdrop_path)}>
                            {(src, loading) => (
                                <img
                                    src={src}
                                    width='auto'
                                    height='auto'
                                    loading='lazy'
                                    alt={`${detailTV?.original_name}`}
                                    style={{ opacity: loading ? 0.5 : 1 }}
                                    className='h-[200px] w-full overflow-hidden object-cover object-top shadow-lg sm:h-[500px]'
                                />
                            )}
                        </ProgressiveImage>
                    }
                </div>
                {/* contents */}
                <div className='content-detail-series lg:flex lg:gap-7'>
                    {/* poster  */}
                    <div className='poster-content hidden w-[30%] rounded-md lg:block'>
                        {loading ? (
                            <Skeleton height={500} />
                        ) : (
                            <ProgressiveImage src={ detailTV?.poster_path === null ? BgNull : getPoster('original', detailTV?.poster_path) } placeholder={ detailTV?.poster_path === null ? BgNull : getPoster('original', detailTV?.poster_path)} >
                                {(src, loading) => (
                                    <img
                                        src={src}
                                        width='auto'
                                        height='auto'
                                        loading='lazy'
                                        className='object-cover'
                                        alt={`${detailTV?.original_name}`}
                                        style={{ opacity: loading ? 0.5 : 1 }}
                                    />
                                )}
                            </ProgressiveImage>
                        )}
                    </div>
                    <div className='wrapper-content w-full space-y-6 lg:w-[70%]'>
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
                                        <span>{`${detailTV?.original_name}`}</span>
                                        <span
                                            className={`${renderTheme(
                                                theme,
                                                'text-gray-400',
                                                'text-gray-600'
                                            )} ml-2 font-light`}
                                        >
                                            (
                                            {`${
                                                detailTV?.first_air_date.split(
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
                                            {detailTV?.genres.map(
                                                (genre, idx) => (
                                                    <Link
                                                        key={idx}
                                                        to={`/genre/${genre.id}/series`}
                                                    >
                                                        <h3
                                                            className='font-medium text-blue-800'
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
                                    ) : detailTV?.episode_run_time.length ===
                                      0 ? (
                                        '0m'
                                    ) : (
                                        `${detailTV?.episode_run_time[0]}m`
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
                                        trailerTV.length === 0 &&
                                        'pointer-events-none'
                                    } montserrat mt-3 flex cursor-pointer items-center gap-x-1 text-blue-600`}
                                    data-lg-size='1280-720'
                                    data-iframe={true}
                                    data-src={`https://www.youtube.com/embed/${trailerTV}`}
                                    data-poster={`https://image.tmdb.org/t/p/w500/${detailTV?.backdrop_path}`}
                                >
                                    {trailerTV.length === 0 ? (
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
                                    detailTV?.tagline === ''
                                        ? 'hidden'
                                        : `${renderTheme(
                                              theme,
                                              'text-gray-300',
                                              'text-gray-700'
                                          )} block`
                                } text-[6vw] font-light italic sm:text-[1.5rem]`}
                            >
                                '{detailTV?.tagline}'
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
                                    data-sub-html={`<h4>${detailTV?.original_name}</h4>`}
                                    alt={`https://image.tmdb.org/t/p/w500/${detailTV?.original_name}`}
                                    data-src={`https://image.tmdb.org/t/p/w500/${detailTV?.poster_path}`}
                                    data-download={`https://image.tmdb.org/t/p/w500/${detailTV?.poster_path}`}
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
                            <div className='space-y-1 text-neutral-700'>
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
                                        detailTV?.overview
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
                                            detailTV?.first_air_date
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
                                            detailTV?.popularity
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
                                            detailTV?.production_companies.map(
                                                (company, idx) => (
                                                    <span
                                                        className='mr-1'
                                                        key={`detail-production-company-${idx}`}
                                                    >
                                                        {company.name}
                                                        {idx + 1 !==
                                                            detailTV
                                                                ?.production_companies
                                                                .length && ','}
                                                    </span>
                                                )
                                            )
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div
                                className={`${renderTheme(
                                    theme,
                                    'text-gray-300',
                                    'text-neutral-700'
                                )} creator-detail mt-8`}
                            >
                                {loading ? (
                                    <Skeleton height={30} width={300} />
                                ) : detailTV?.created_by.length < 1 ? (
                                    <span className='inter'>
                                        Tidak ada informasi
                                    </span>
                                ) : (
                                    detailTV?.created_by.map((item, idx) => (
                                        <span
                                            className='inter'
                                            key={`detail-creator-item-${idx}`}
                                        >
                                            {item.name}
                                            {idx + 1 !==
                                                detailTV?.created_by.length &&
                                                ', '}
                                        </span>
                                    ))
                                )}
                                <h6 className='poppins mt-1 text-[1rem] font-medium'>
                                    Creator TV Series
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Nevrays>
    )
}

export default DetailSeries
