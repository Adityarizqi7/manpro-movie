import tmbd from '@/api/tmbd'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'

import '@/styles/component/movie/_detailmovies.scss'
import Netray from '@/layouts/Netray'

const DetailMovie = () => {
    const [detailMV, setDetailMV] = useState(null)
    const { movieId } = useParams()

    const getDetailMovie = useCallback(async () => {
        const res = await tmbd.get(`/movie/${movieId}`)

        if (res.status === 200) {
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
                    {detailMV?.backdrop_path && (
                        <img
                            className='object-cover object-center sm:h-[500px] h-[200px] w-full shadow-lg'
                            src={`https://image.tmdb.org/t/p/original_filter(grayscale,032541,01b4e4)/${detailMV?.backdrop_path}`}
                            alt={`${detailMV?.original_title}`}
                        />
                    )}
                </div>
                {/* contents */}
                <div className='content-detail-movie flex gap-5'>
                    {/* poster  */}
                    <div className='sm:block hidden rounded-md'>
                        <img
                            className='object-cover'
                            src={`https://image.tmdb.org/t/p/w342/${detailMV?.poster_path}`}
                            alt={`${detailMV?.original_title}`}
                        />
                    </div>
                    <div>
                        {/* head title  */}
                        <div className='mb-8'>
                            <h2 className='text-[1.875rem] font-medium text-neutral-800 montserrat'>
                                {detailMV?.original_title} &#40;
                                {detailMV?.release_date.split('-')[0]}&#41;
                            </h2>
                            <div className='mt-1 space-x-4 poppins'>
                                {detailMV?.genres.map((genre, idx) => (
                                    <span
                                        className='font-medium text-blue-800'
                                        key={`detail-genre-${idx}`}
                                    >
                                        #{genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* informations  */}
                        <div>
                            {/* description  */}
                            <div className='space-y-1 text-neutral-700'>
                                <h6 className='text-[1.125rem] font-medium poppins'>
                                    Deskripsi Singkat
                                </h6>
                                <p className='inter'>{detailMV?.overview}</p>
                            </div>
                            {/* advanced information lists  */}
                            <div className='mt-6 flex flex-col space-y-2 text-neutral-700'>
                                <div className='flex items-center gap-3'>
                                    <h6 className='min-w-[200px] text-[1rem] font-medium poppins'>
                                        Tanggal Rilis
                                    </h6>
                                    <p className='inter'>{detailMV?.release_date}</p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <h6 className='min-w-[200px] text-[1rem] font-medium poppins'>
                                        Nilai Popularitas
                                    </h6>
                                    <p className='inter'>{detailMV?.popularity} popularitas</p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <h6 className='min-w-[200px] text-[1rem] font-medium poppins'>
                                        Perusahaan produksi film
                                    </h6>
                                    <p className='inter'>
                                        {detailMV?.production_companies.map(
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
