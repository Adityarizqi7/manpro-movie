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
    const [togglerTrailer, setTogglerTrailer] = useState(false)
    const [loading, setLoading] = useState(false)

    const [detailMV, setDetailMV] = useState(null)
    const [trailerMV, setTrailerMV] = useState(null)
    const { movieId } = useParams()

    const getDetailMovie = useCallback(async () => {
        setLoading(true)
        const res = await tmbd.get(`/movie/${movieId}`)
        const res_ = await tmbd.get(`/movie/${movieId}/videos`, {
            params: {
                append_to_response: 'videos',
            },
        })

        if (res.status === 200) {
            setLoading(false)
            setDetailMV(res.data)
        }

        if (res_.status === 200) {
            setLoading(false)
            setTrailerMV(res_.data.results.filter(value => value.name === 'Official Trailer').map(item => {
                return item.key
            }))
        }
    }, [])

    useEffect(() => {
        getDetailMovie()
    }, [getDetailMovie])

    return (
        <Netray
            title={ loading ? 'Loading' : `${detailMV?.original_title} (${detailMV?.release_date.split('-')[0]})` + ' - Netray'}
            kw='netray home, netray beranda, netray id home, netray beranda indonesia'
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
                        { 
                            !loading &&
                            <img
                                className='object-cover object-top sm:h-[500px] h-[200px] overflow-hidden w-full shadow-lg'
                                src={`https://image.tmdb.org/t/p/original/${detailMV?.backdrop_path}`}
                                alt={`${detailMV?.original_title}`}
                            />
                        }
                </div>
                {/* contents */}
                <div className='content-detail-movie lg:flex lg:gap-7'>
                    {/* poster  */}
                    <div className='poster-content lg:block hidden rounded-md w-[30%]'>
                        {
                            loading ? <Skeleton height={500} /> :
                            <img
                                className='object-cover'
                                src={`https://image.tmdb.org/t/p/w500/${detailMV?.poster_path}`}
                                alt={`${detailMV?.original_title}`}
                            />
                        }
                    </div>
                    <div className='wrapper-content lg:w-[70%] w-full space-y-8'>
                        {/* head title  */}
                        <div className='head-title-content'>
                            <h2 className='text-[1.875rem] font-medium text-neutral-800 montserrat'>
                                { loading ? <Skeleton width={300} height={50} /> :
                                    (
                                        <>
                                            <span>{`${detailMV?.original_title}`}</span>
                                            <span className='text-gray-600 font-light ml-2'>({`${detailMV?.release_date.split('-')[0]}`})</span>
                                        </>
                                    )
                                }
                            </h2>
                            <div className='flex flex-wrap items-center gap-3 mt-2'>
                                {
                                    loading ?
                                        <Skeleton height={30} width={100} count={3} containerClassName={'flex flex-wrap gap-4 last:gap-0'} />
                                    :
                                    <div className="div flex gap-3 items-center">
                                        <div className='flex flex-wrap gap-4 poppins'>
                                            {
                                                detailMV?.genres.map((genre, idx) => (
                                                        <h3
                                                            className='font-medium text-blue-800'
                                                            key={`detail-genre-${idx}`}
                                                        >
                                                            #{genre.name}
                                                        </h3>
                                                ))
                                            }
                                        </div>
                                    </div>
                                }
                                <span>·</span>
                                <h3 className='montserrat'>
                                    {
                                        loading ? <Skeleton height={30} width={50} containerClassName={'flex flex-wrap gap-4 last:gap-0'} />
                                        :
                                        detailMV?.runtime === '' ? '0m' : `${detailMV?.runtime}m`
                                    }
                                </h3>
                            </div>
                            <Lightbox 
                                source={[
                                    <iframe
                                        className='aspect-video'
                                        width="1920px"
						                height="1080px"
                                        src={`https://www.youtube.com/embed/${trailerMV}?showinfo=0&enablejsapi=1&origin=https://netray.netlify.app`}
                                        title={`${detailMV?.original_title}`}
                                        frameBorder='0'
                                        scrolling="no"
                                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                        allowFullScreen
                                    ></iframe>
                                ]} 
                                toggler={togglerTrailer}
                            >
                                <button onClick={() => setTogglerTrailer(!togglerTrailer)} className='mt-3 montserrat flex items-center text-blue-600 gap-x-1'>
                                    <PlayIcon className='w-4 h-4' />
                                    <h2 className='text-[0.95rem] font-normal'>Play Opening Credits</h2>
                                </button>
                            </Lightbox>
                        </div>
                        {
                            loading ? <Skeleton width={180} height={45} /> :
                            <h2 className={`${detailMV?.tagline === '' ? 'hidden' : 'block'} italic text-gray-700 font-light sm:text-[1.5rem] text-[6vw]`}>'{detailMV?.tagline}'</h2>
                        }
                        {/* Poster on Mobile */}
                        {/* informations  */}
                        <div className='wrapper-information'>
                            <Lightbox 
                                source={[
                                    <img
                                        className='object-cover'
                                        src={`https://image.tmdb.org/t/p/w500/${detailMV?.poster_path}`}
                                        alt={`${detailMV?.original_title}`}
                                    />
                                ]} 
                                toggler={toggler}
                            >
                                <button onClick={() => setToggler(!toggler)} className='button-poster-mobile lg:hidden mb-3 flex items-center gap-2 montserrat focus:outline-none py-1 px-3 border border-blue-600/60 rounded-md'>
                                    <PhotoIcon className='w-5 h-5' />
                                    <span>Lihat Poster</span>
                                </button>
                            </Lightbox>
                            {/* description  */}
                            <div className='space-y-1 text-neutral-700'>
                                <h6 className='text-[1.125rem] font-medium poppins'>
                                    Deskripsi Singkat
                                </h6>
                                <p className='inter'>
                                    {
                                        loading ? <Skeleton height={60} /> :
                                        detailMV?.overview
                                    }
                                </p>
                            </div>
                            {/* advanced information lists  */}
                            <div className='mt-6 flex flex-col gap-5 text-neutral-700'>
                                <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
                                    <h6 className='min-w-[200px] text-[1rem] font-medium poppins'>
                                        Tanggal Rilis
                                    </h6>
                                    <p className='inter'>{
                                        loading ? <Skeleton height={30} width={150} /> :
                                        detailMV?.release_date
                                    }</p>
                                </div>
                                <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
                                    <h6 className='min-w-[200px] text-[1rem] font-medium poppins'>
                                        Nilai Popularitas
                                    </h6>
                                    <p className='inter'>{
                                        loading ? <Skeleton height={30} width={150} /> :
                                        detailMV?.popularity
                                    } popularitas</p>
                                </div>
                                <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
                                    <h6 className='min-w-[200px] text-[1rem] font-medium poppins'>
                                        Perusahaan produksi film
                                    </h6>
                                    <p className='inter'>
                                        {
                                            loading ? <Skeleton height={30} width={300} /> :
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
                                        }
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
