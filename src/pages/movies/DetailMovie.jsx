import tmbd from '@/api/tmbd'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import Lightbox from '@/components/image/Lightbox'
import { useCallback, useEffect, useState } from 'react'
import { PhotoIcon, PlayIcon } from '@heroicons/react/24/outline'

import 'react-loading-skeleton/dist/skeleton.css'
import '@/styles/component/movie/_detailmovies.scss'

import Netray from '@/layouts/Netray'

const DetailMovie = () => {
    const [toggler, setToggler] = useState(false)
    const [loading, setLoading] = useState(false)
    const [togglerTrailer, setTogglerTrailer] = useState(false)

    const [detailMV, setDetailMV] = useState(null)
    const [trailerMV, setTrailerMV] = useState([])
    const { movieId } = useParams()

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
    }, [])

    useEffect(() => {
        getDetailMovie()
    }, [getDetailMovie])

    return (
        <Netray
            title={
                loading
                    ? 'Loading'
                    : `${detailMV?.original_title} (${
                          detailMV?.release_date.split('-')[0]
                      })` + ' - Netray'
            }
            kw={detailMV?.original_title + ' netray'}
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
                            <h2 className='montserrat text-[1.875rem] font-medium text-neutral-800'>
                                {loading ? (
                                    <Skeleton width={300} height={50} />
                                ) : (
                                    <>
                                        <span>{`${detailMV?.original_title}`}</span>
                                        <span className='ml-2 font-light text-gray-600'>
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
                                    ) : detailMV?.runtime === '' ? (
                                        '0m'
                                    ) : (
                                        `${detailMV?.runtime}m`
                                    )}
                                </h3>
                            </div>
                            <Lightbox
                                source={[
                                    {
                                        type: 'video',
                                        width: 1920,
                                        height: 1080,
                                        poster: `https://image.tmdb.org/t/p/original/${detailMV?.backdrop_path}`,
                                        sources: [
                                            {
                                                src: `http://www.youtube.com/embed/${trailerMV}?showinfo=0&enablejsapi=1&origin=https://netray.netlify.app`,
                                                type: 'video/mp4',
                                            },
                                        ],
                                        crossOrigin: 'anonymous',
                                    },
                                ]}
                                openFunc={togglerTrailer}
                                closeFunc={() =>
                                    setTogglerTrailer(!togglerTrailer)
                                }
                            >
                                <button
                                    onClick={() =>
                                        setTogglerTrailer(!togglerTrailer)
                                    }
                                    className={`${
                                        trailerMV.length === 0 &&
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
                                    detailMV?.tagline === ''
                                        ? 'hidden'
                                        : 'block'
                                } text-[6vw] font-light italic text-gray-700 sm:text-[1.5rem]`}
                            >
                                '{detailMV?.tagline}'
                            </h2>
                        )}
                        {/* Poster on Mobile */}
                        {/* informations  */}
                        <div className='wrapper-information'>
                            <Lightbox
                                source={[
                                    {
                                        src: `https://image.tmdb.org/t/p/w500/${detailMV?.poster_path}`,
                                        title: `${detailMV?.original_title}`,
                                    },
                                ]}
                                openFunc={toggler}
                                closeFunc={() => setToggler(toggler)}
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
                                        detailMV?.overview
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
        </Netray>
    )
}

export default DetailMovie
