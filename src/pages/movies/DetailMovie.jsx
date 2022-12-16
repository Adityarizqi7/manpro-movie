import tmbd from '@/api/tmbd'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import Lightbox from '@/components/image/Lightbox'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { useCallback, useEffect, useState } from 'react'

import 'react-loading-skeleton/dist/skeleton.css'
import '@/styles/component/movie/_detailmovies.scss'

import Netray from '@/layouts/Netray'

const DetailMovie = () => {
    const [toggler, setToggler] = useState(false)
    const [loading, setLoading] = useState(false)

    const [detailMV, setDetailMV] = useState(null)
    const { movieId } = useParams()

    const getDetailMovie = useCallback(async () => {
        setLoading(true)
        const res = await tmbd.get(`/movie/${movieId}`)

        if (res.status === 200) {
            setLoading(false)
            setDetailMV(res.data)
        }
    }, [])

    useEffect(() => {
        getDetailMovie()
    }, [getDetailMovie])

    return (
        <Netray
            title='Netray Official — Bluray Film'
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
                            detailMV?.backdrop_path && (
                                <img
                                    className='object-cover object-center sm:h-[500px] h-[200px] w-full shadow-lg'
                                    src={`https://image.tmdb.org/t/p/original_filter(grayscale,032541,01b4e4)/${detailMV?.backdrop_path}`}
                                    alt={`${detailMV?.original_title}`}
                                />
                            )
                        }
                </div>
                {/* contents */}
                <div className='content-detail-movie flex gap-7'>
                    {/* poster  */}
                    <div className='poster-content lg:block hidden rounded-md basis-[50%]'>
                        {loading && <Skeleton height={500} />}
                        {
                            !loading &&
                            <img
                                className='object-cover'
                                src={`https://image.tmdb.org/t/p/w342/${detailMV?.poster_path}`}
                                alt={`${detailMV?.original_title}`}
                            />
                        }
                    </div>
                    <div className='wrapper-content'>
                        {/* head title  */}
                        <div className='head-title-content mb-6'>
                            <h2 className='text-[1.875rem] font-medium text-neutral-800 montserrat'>
                                { loading && <Skeleton width={300} height={50} />}
                                { !loading && detailMV?.original_title }
                                { !loading && detailMV?.release_date.split('-')[0] }
                            </h2>
                            <div className='mt-1'>
                                { loading && <Skeleton height={30} width={100} count={3} containerClassName={'flex flex-wrap gap-4'} className='mt-1' /> }
                            </div>
                            {
                                !loading &&
                                <div className='mt-1 flex flex-wrap gap-4 poppins'>
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
                            }
                        </div>
                        {/* Poster on Mobile */}
                        <Lightbox 
                            source={[
                                <img
                                    className='object-cover'
                                    src={`https://image.tmdb.org/t/p/w342/${detailMV?.poster_path}`}
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
                        {/* informations  */}
                        <div className='wrapper-information'>
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
