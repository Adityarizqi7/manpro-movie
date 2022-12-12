import { useParams } from 'react-router-dom'
import Netray from '@/layouts/Netray'
import { useCallback, useEffect, useState } from 'react'
import tmbd from '@/api/tmbd'

const DetailPage = () => {
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

        console.log('detail movie data', detailMV)
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
            <div className='mx-auto flex max-w-7xl flex-col gap-6 py-6'>
                {/* banner */}
                <div className='max-h-[500px] overflow-hidden rounded-lg'>
                    <img
                        className='object-cover object-center'
                        src={`https://image.tmdb.org/t/p/original/${detailMV.backdrop_path}`}
                        alt=''
                    />
                </div>
                <hr />
                {/* contents */}
                <div className='grid grid-cols-4 gap-5'>
                    {/* poster  */}
                    <div className='overflow-hidden rounded-md'>
                        <img
                            className='object-cover'
                            src={`https://image.tmdb.org/t/p/w342/${detailMV.poster_path}`}
                            alt=''
                        />
                    </div>
                    <div className='col-span-3'>
                        {/* head title  */}
                        <div className='mb-8'>
                            <h2 className='text-3xl font-medium text-neutral-800'>
                                {detailMV.original_title} &#40;
                                {detailMV.release_date.split('-')[0]}&#41;
                            </h2>
                            <div className='mt-1 space-x-4'>
                                {detailMV.genres.map((genre) => (
                                    <span className='font-medium text-blue-800'>
                                        #{genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* informations  */}
                        <div className='flex flex-col'>
                            {/* description  */}
                            <div className='space-y-1 text-neutral-700'>
                                <h6 className='text-lg font-medium '>
                                    Deskripsi Singkat
                                </h6>
                                <p>{detailMV.overview}</p>
                            </div>
                            {/* advanced information lists  */}
                            <div className='mt-6 flex flex-col space-y-2 text-neutral-700'>
                                <div className='flex items-center'>
                                    <h6 className='min-w-[200px] text-base font-medium'>
                                        Tanggal Rilis
                                    </h6>
                                    <p>{detailMV.release_date}</p>
                                </div>
                                <div className='flex items-center'>
                                    <h6 className='min-w-[200px] text-base font-medium'>
                                        Nilai Popularitas
                                    </h6>
                                    <p>{detailMV.popularity} popularitas</p>
                                </div>
                                <div className='flex items-center'>
                                    <h6 className='min-w-[200px] text-base font-medium'>
                                        Perusahaan produksi film
                                    </h6>
                                    <p>
                                        {detailMV.production_companies.map(
                                            (company, idx) => (
                                                <span className='mr-1'>
                                                    {company.name}
                                                    {idx + 1 !==
                                                        detailMV
                                                            .production_companies
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
            </div>
        </Netray>
    )
}

export default DetailPage
