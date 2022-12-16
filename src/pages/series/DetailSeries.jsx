import tmbd from '@/api/tmbd'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import Lightbox from '@/components/image/Lightbox'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { useCallback, useEffect, useState } from 'react'

import 'react-loading-skeleton/dist/skeleton.css'
import '@/styles/component/movie/_detailmovies.scss'

import Netray from '@/layouts/Netray'

const DetailSeries = () => {
    const [toggler, setToggler] = useState(false)
    const [loading, setLoading] = useState(false)

    const [detailTV, setDetailTV] = useState(null)
    const { seriesId } = useParams()

    const getDetailMovie = useCallback(async () => {
        setLoading(true)
        const res = await tmbd.get(`/tv/${seriesId}`)

        if (res.status === 200) {
            setLoading(false)
            setDetailTV(res.data)
        }
    }, [])

    useEffect(() => {
        getDetailMovie()
    }, [getDetailMovie])

    return (
        <Netray
            title={ `${loading ? 'Loading' : detailTV?.original_name} - Netray`}
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
                                src={`https://image.tmdb.org/t/p/original_filter(grayscale,032541,01b4e4)/${detailTV?.backdrop_path}`}
                                alt={`${detailTV?.original_name}`}
                            />
                        }
                </div>
                {/* contents */}
                <div className='content-detail-movie lg:flex lg:gap-7'>
                    {/* poster  */}
                    <div className='poster-content lg:block hidden rounded-md w-[30%]'>
                        {loading && <Skeleton height={500} />}
                        {
                            !loading &&
                            <img
                                className='object-cover'
                                src={`https://image.tmdb.org/t/p/w500/${detailTV?.poster_path}`}
                                alt={`${detailTV?.original_name}`}
                            />
                        }
                    </div>
                    <div className='wrapper-content lg:w-[70%] w-full space-y-6'>
                        {/* head title  */}
                        <div className='head-title-content'>
                            <h2 className='text-[1.875rem] font-medium text-neutral-800 montserrat'>
                                { loading ? <Skeleton width={300} height={50} /> :
                                    (
                                        <>
                                            <span>{`${detailTV?.original_name}`}</span>
                                            <span className='text-gray-600 font-light ml-2'>({`${detailTV?.first_air_date.split('-')[0]}`})</span>
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
                                                detailTV?.genres.map((genre, idx) => (
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
                                        detailTV?.episode_run_time.length === 0 ? '0m' : `${detailTV?.episode_run_time[0]}m`
                                    }
                                </h3>
                            </div>
                        </div>
                        {
                            loading ? <Skeleton width={180} height={45} /> :
                            <h2 className={`${detailTV?.tagline === '' ? 'hidden' : 'block'} italic text-gray-700 font-light sm:text-[1.5rem] text-[6vw]`}>'{detailTV?.tagline}'</h2>
                        }
                        {/* Poster on Mobile */}
                        {/* informations  */}
                        <div className='wrapper-information'>
                            <Lightbox 
                                source={[
                                    <img
                                        className='object-cover'
                                        src={`https://image.tmdb.org/t/p/w342/${detailTV?.poster_path}`}
                                        alt={`${detailTV?.original_name}`}
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
                                        detailTV?.overview
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
                                        detailTV?.first_air_date
                                    }</p>
                                </div>
                                <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
                                    <h6 className='min-w-[200px] text-[1rem] font-medium poppins'>
                                        Nilai Popularitas
                                    </h6>
                                    <p className='inter'>{
                                        loading ? <Skeleton height={30} width={150} /> :
                                        detailTV?.popularity
                                    } popularitas</p>
                                </div>
                                <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
                                    <h6 className='min-w-[200px] text-[1rem] font-medium poppins'>
                                        Perusahaan produksi film
                                    </h6>
                                    <p className='inter'>
                                        {
                                            loading ? <Skeleton height={30} width={300} /> :
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
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="creator-detail mt-8 text-neutral-700">
                                {
                                    loading ? <Skeleton height={30} width={300} /> :
                                    detailTV?.created_by.length < 1 ?
                                    <span className='inter'>Tidak ada informasi</span>
                                    :
                                    detailTV?.created_by.map(
                                        (item, idx) => (
                                            <span
                                                className='inter'
                                                key={`detail-creator-item-${idx}`}
                                            >
                                                {item.name}
                                                {idx + 1 !==
                                                            detailTV
                                                                ?.created_by
                                                                .length && ', '}
                                            </span>
                                        )
                                    )
                                }
                                <h6 className='mt-1 text-[1rem] font-medium poppins'>Creator TV Series</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Netray>
    )
}

export default DetailSeries