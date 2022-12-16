import tmdb from '../../api/tmbd'
import { Navigation, Lazy } from 'swiper'
import Skeleton from 'react-loading-skeleton'
import { Swiper, SwiperSlide } from 'swiper/react'
import React, { useState, useEffect, useCallback } from 'react'

import 'swiper/scss'
import 'swiper/scss/lazy'
import 'swiper/scss/navigation'
import 'react-loading-skeleton/dist/skeleton.css'

import { MovieCard, MovieCard2, MovieCard3 } from './MovieCard'
import { SkeletonCard } from '../loading/skeleton/SkeletonCard'

function TrendMV() {
    const [trendMV, setTrendMV] = useState([])
    const [loading, setLoading] = useState(false)

    const getDataTrend = useCallback( async () => {
        try {
            setLoading(true)
            const { data, status} = await tmdb.get('/trending/movie/week')
            status === 200 && setTrendMV(data.results)
            setLoading(false)
        } catch {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        getDataTrend()
    }, [getDataTrend])

    return (
        <Swiper
            modules={[Navigation, Lazy]}
            style={{
                '--swiper-navigation-color': '#fff',
            }}
            spaceBetween={15}
            slidesPerView={2}
            onSwiper={(swiper) => {
                swiper.allowTouchMove = true
            }}
            breakpoints={{
                640: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 6,
                },
            }}
        >
            {
                loading ? (
                    <SkeletonCard classSkeletonContainer={'lg:grid-cols-6'} />
                ) :
                trendMV &&
                trendMV.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <MovieCard {...item} />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

function UpcomingMV() {
    const [upcomingMV, setUpcomingMV] = useState([])
    const [loading, setLoading] = useState(false)

    const getDataUpcomingMV = useCallback( async () => {
        try {
            setLoading(true)
            const { data, status } = await tmdb.get('/movie/upcoming')
            status === 200 && setUpcomingMV(data.results) 
            setLoading(false)
        } catch {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getDataUpcomingMV()
    }, [getDataUpcomingMV])

    return (
        <Swiper
            modules={[Navigation, Lazy]}
            style={{
                '--swiper-navigation-color': '#fff',
            }}
            spaceBetween={15}
            slidesPerView={2}
            centeredSlides
            centeredSlidesBounds
            onSwiper={(swiper) => {
                swiper.allowTouchMove = true
            }}
            breakpoints={{
                640: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 4,
                },
            }}
        >
            {
                loading ? (
                    <SkeletonCard classSkeletonTitle={'hidden'} classSkeletonContainer={'lg:grid-cols-4'} length={4} />
                ) :
                upcomingMV &&
                upcomingMV.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <MovieCard3 {...item} classOverlay='hidden' classWrapper='cursor-grab' />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

function NowPlayMV() {
    const [nowPlayMV, setNowPlayMV] = useState([])
    const [loading, setLoading] = useState(false)

    const getDataNowPlayMV = useCallback( async () => {
        try {
            setLoading(true)
            const { data, status } = await tmdb.get('/movie/now_playing')
            status === 200 && setNowPlayMV(data.results)
            setLoading(false)
        } catch {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getDataNowPlayMV()
    }, [getDataNowPlayMV])

    return (
        <Swiper
            modules={[Navigation, Lazy]}
            style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-navigation-size': '1.75rem',
            }}
            spaceBetween={15}
            slidesPerView={2}
            navigation
            onSwiper={(swiper) => {
                swiper.allowTouchMove = true
            }}
            breakpoints={{
                640: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 6,
                },
            }}
        >
            {
                loading ? (
                    <SkeletonCard classSkeletonTitle={'hidden'} classSkeletonContainer={'lg:grid-cols-6'} height={'15vw'} />
                ) :
                nowPlayMV &&
                nowPlayMV.slice(0, 10).map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <MovieCard3 {...item} classWrapper='cursor-pointer' />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

function PopularMV() {
    const [popularMV, setPopularMV] = useState([])
    const [loading, setLoading] = useState(false)

    const getDataPopularMV = useCallback ( async () => {
        try {
            setLoading(true)
            const { data, status } = await tmdb.get('/movie/popular')
            status === 200 && setPopularMV(data.results)
            setLoading(false)
        } catch {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getDataPopularMV()
    }, [getDataPopularMV])

    return (
        <Swiper
            modules={[Navigation, Lazy]}
            style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-navigation-size': '1.75rem',
            }}
            spaceBetween={15}
            slidesPerView={2}
            navigation
            onSwiper={(swiper) => {
                swiper.allowTouchMove = false
            }}
            breakpoints={{
                640: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 6,
                },
            }}
        >
            {
                loading ? (
                    <SkeletonCard classSkeletonTitle={'hidden'} classSkeletonContainer={'lg:grid-cols-6'} height={'15vw'} />
                ) :
                popularMV &&
                popularMV.slice(0, 10).map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <MovieCard3 {...item} classWrapper='cursor-pointer' />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

function TrendTV() {
    const [trendTV, setTrendTV] = useState([])
    const [loading, setLoading] = useState(false)

    const getDataTrend = useCallback( async () => {
        try {
            setLoading(true)
            const { data, status } = await tmdb.get('/trending/tv/week')
            status === 200 && setTrendTV(data.results)
            setLoading(false)
        } catch {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getDataTrend()
    }, [getDataTrend])

    return (
        <Swiper
            modules={[Navigation, Lazy]}
            style={{
                '--swiper-navigation-color': '#fff',
            }}
            spaceBetween={15}
            slidesPerView={2}
            onSwiper={(swiper) => {
                swiper.allowTouchMove = true
            }}
            breakpoints={{
                640: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 6,
                },
            }}
        >
            {
                loading ? (
                    <SkeletonCard classSkeletonContainer={'lg:grid-cols-6'} />
                ) :
                trendTV &&
                trendTV.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <MovieCard {...item} />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

function PopularTV() {
    const [PopularTV, setPopularTV] = useState([])
    const [trailerSeries, setTrailerSeries] = useState([])
    const [loading, setLoading] = useState(false)

    const getDataTrend = useCallback( async () => {
        try {
            setLoading(true)
            const { data, status } = await tmdb.get('/tv/popular', {
                params: {
                    append_to_response: 'videos',
                },
            })
            status === 200 && setPopularTV(data.results[0])
            setLoading(false)
        } catch {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getDataTrend()
    }, [getDataTrend])

    useEffect(() => {
        const getDataTrailerSeries = async () => {
            const { data } = await tmdb.get(`/tv/${119051}/videos`, {
                params: {
                    append_to_response: 'videos',
                },
            })

            setTrailerSeries(data.results[Math.floor(Math.random() * 9) + 0])
        }

        getDataTrailerSeries()
    }, [])

    return (
        loading ? (
            <>
                <Skeleton height={800} />
            </>
        ) :
        PopularTV && (
            <MovieCard2 {...PopularTV} key_trailer={trailerSeries.key} />
        )
    )
}

export { TrendMV, UpcomingMV, NowPlayMV, PopularMV, TrendTV, PopularTV }
