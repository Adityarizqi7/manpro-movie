import tmbd from '@/api/tmbd'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import Lightbox from '@/components/image/Lightbox'
import { useCallback, useEffect, useState } from 'react'
import { PhotoIcon, PlayIcon } from '@heroicons/react/24/outline'

import 'react-loading-skeleton/dist/skeleton.css'
import '@/styles/component/movie/_detailmovies.scss'

import Netray from '@/layouts/Netray'

const DetailSeries = () => {
    const [toggler, setToggler] = useState(false)
    const [loading, setLoading] = useState(false)
    const [togglerTrailer, setTogglerTrailer] = useState(false)

    const [detailTV, setDetailTV] = useState(null)
    const [trailerTV, setTrailerTV] = useState([])
    const { seriesId } = useParams()

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

    useEffect(() => {
        getDetailSeries()
    }, [getDetailSeries])

    return (
        <Netray
            title={`${loading ? 'Loading' : detailTV?.original_name} - Netray`}
            kw={detailTV?.original_title + ' netray'}
            desc='Netray Official adalah website yang menyediakan kumpulan film-film baik yang yang terbaru maupun yang sudah lama dengan pilihan resolusi yang bisa disesuaikan'
            ogUrl={''}
            ogType={''}
            ogTitle={''}
            ogDesc={''}
            twitTitle={''}
        >
            <main className='detail-movie-component'>
                {/* banner */}
                <div className='jumbotron-image'>
                    {loading && <Skeleton height={500} />}
                    {!loading && (
                        <img
                            className='h-[200px] w-full overflow-hidden object-cover object-top shadow-lg sm:h-[500px]'
                            src={`https://image.tmdb.org/t/p/original_filter(grayscale,032541,01b4e4)/${detailTV?.backdrop_path}`}
                            alt={`${detailTV?.original_name}`}
                        />
                    )}
                </div>
                {/* contents */}
                <div className='content-detail-movie lg:flex lg:gap-7'>
                    {/* poster  */}
                    <div className='poster-content hidden w-[30%] rounded-md lg:block'>
                        {loading && <Skeleton height={500} />}
                        {!loading && (
                            <img
                                className='object-cover'
                                src={`https://image.tmdb.org/t/p/w500/${detailTV?.poster_path}`}
                                alt={`${detailTV?.original_name}`}
                            />
                        )}
                    </div>
                    <div className='wrapper-content w-full space-y-6 lg:w-[70%]'>
                        {/* head title  */}
                        <div className='head-title-content'>
                            <h2 className='montserrat text-[1.875rem] font-medium text-neutral-800'>
                                {loading ? (
                                    <Skeleton width={300} height={50} />
                                ) : (
                                    <>
                                        <span>{`${detailTV?.original_name}`}</span>
                                        <span className='ml-2 font-light text-gray-600'>
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
                                                    <h3
                                                        className='font-medium text-blue-800'
                                                        key={`detail-genre-${idx}`}
                                                    >
                                                        #{genre.name}
                                                    </h3>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                                <span>·</span>
                                <h3 className='montserrat'>
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
                            <Lightbox
                                source={[
                                    <iframe
                                        className='aspect-video'
                                        width='1920px'
                                        height='1080px'
                                        src={`https://www.youtube.com/embed/${trailerTV}?showinfo=0&enablejsapi=1&origin=https://netray.netlify.app`}
                                        title={`${detailTV?.original_name}`}
                                        frameBorder='0'
                                        scrolling='no'
                                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                        allowFullScreen
                                    ></iframe>,
                                ]}
                                toggler={togglerTrailer}
                            >
                                <button
                                    onClick={() =>
                                        setTogglerTrailer(!togglerTrailer)
                                    }
                                    className={`${
                                        trailerTV.length === 0 &&
                                        'pointer-events-none'
                                    } montserrat mt-3 flex items-center gap-x-1 text-blue-600`}
                                >
                                    <PlayIcon className='h-4 w-4' />
                                    <h2 className='text-[0.95rem] font-normal'>
                                        Play Opening Credits
                                    </h2>
                                </button>
                            </Lightbox>
                        </div>
                        {loading ? (
                            <Skeleton width={180} height={45} />
                        ) : (
                            <h2
                                className={`${
                                    detailTV?.tagline === ''
                                        ? 'hidden'
                                        : 'block'
                                } text-[6vw] font-light italic text-gray-700 sm:text-[1.5rem]`}
                            >
                                '{detailTV?.tagline}'
                            </h2>
                        )}
                        {/* Poster on Mobile */}
                        {/* informations  */}
                        <div className='wrapper-information'>
                            <Lightbox
                                source={[
                                    <img
                                        className='object-cover'
                                        src={`https://image.tmdb.org/t/p/w342/${detailTV?.poster_path}`}
                                        alt={`${detailTV?.original_name}`}
                                    />,
                                ]}
                                toggler={toggler}
                            >
                                <button
                                    onClick={() => setToggler(!toggler)}
                                    className='button-poster-mobile montserrat mb-3 flex items-center gap-2 rounded-md border border-blue-600/60 py-1 px-3 focus:outline-none lg:hidden'
                                >
                                    <PhotoIcon className='h-5 w-5' />
                                    <span>Lihat Poster</span>
                                </button>
                            </Lightbox>
                            {/* description  */}
                            <div className='space-y-1 text-neutral-700'>
                                <h6 className='poppins text-[1.125rem] font-medium'>
                                    Deskripsi Singkat
                                </h6>
                                <p className='inter'>
                                    {loading ? (
                                        <Skeleton height={60} />
                                    ) : (
                                        detailTV?.overview
                                    )}
                                </p>
                            </div>
                            {/* advanced information lists  */}
                            <div className='mt-6 flex flex-col gap-5 text-neutral-700'>
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
                            <div className='creator-detail mt-8 text-neutral-700'>
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
        </Netray>
    )
}

export default DetailSeries
