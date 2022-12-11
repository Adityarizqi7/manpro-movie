import React from 'react'
import tmdb from '../../api/tmbd'
import { Navigation, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/lazy';
import "swiper/scss/navigation";
import {MovieCard, MovieCard2, MovieCard3} from './MovieCard'

function TrendMV() {
    const [trendMV, setTrendMV] = React.useState([])

    React.useEffect(() => {
        const getDataTrend = async () => {
            const { data } = await tmdb.get('/trending/movie/week')
            setTrendMV(data.results)
        }

        getDataTrend()
    }, [])

    return (
        <Swiper
            modules={[Navigation, Lazy]}
            style={{
                "--swiper-navigation-color": "#fff",
            }}
            spaceBetween={15}
            slidesPerView={2}
            navigation
            centeredSlides
            centeredSlidesBounds
            onSwiper={ swiper => {
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
                    trendMV &&
                    trendMV.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <MovieCard {...item} />
                            </SwiperSlide>
                        )
                })}
        </Swiper>
    )
}

function UpcomingMV() {
    const [upcomingMV, setUpcomingMV] = React.useState([])

    React.useEffect(() => {
        const getDataUpcomingMV = async () => {
            const { data } = await tmdb.get('/movie/upcoming', {
                params: {
                    region: 'ID'
                }
            })
            setUpcomingMV(data.results)
        }

        getDataUpcomingMV()
    }, [])

    return (
        <Swiper
            modules={[Navigation, Lazy]}
            style={{
                "--swiper-navigation-color": "#fff",
            }}
            spaceBetween={15}
            slidesPerView={2}
            centeredSlides
            centeredSlidesBounds
            onSwiper={ swiper => {
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
                upcomingMV &&
                upcomingMV.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <MovieCard3 {...item} classOverlay='hidden' />
                        </SwiperSlide>
                    )
            })}
        </Swiper>
    )
}

function NowPlayMV() {
    const [nowPlayMV, setNowPlayMV] = React.useState([])

    React.useEffect(() => {
        const getDataNowPlayMV = async () => {
            const { data } = await tmdb.get('/movie/now_playing', {
                params: {
                    region: 'ID'
                }
            })
            setNowPlayMV(data.results)
        }

        getDataNowPlayMV()
    }, [])

    return (
        <Swiper
            modules={[Navigation, Lazy]}
            style={{
                "--swiper-navigation-color": "#fff",
            }}
            spaceBetween={15}
            slidesPerView={2}
            navigation
            onSwiper={ swiper => {
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
                    nowPlayMV &&
                    nowPlayMV.slice(0, 10).map((item, index) => {
                        return (
                            <SwiperSlide>
                                <MovieCard3 key={index} {...item} />
                            </SwiperSlide>
                        )
                })}
        </Swiper>
    )
}

function PopularMV() {
    const [popularMV, setPopularMV] = React.useState([])

    React.useEffect(() => {
        const getDataPopularMV = async () => {
            const { data } = await tmdb.get('/movie/popular')
            setPopularMV(data.results)
        }

        getDataPopularMV()
    }, [])

    return (
        <Swiper
                        modules={[Navigation, Lazy]}
            style={{
                "--swiper-navigation-color": "#fff",
            }}
            spaceBetween={15}
            slidesPerView={2}
            navigation
            onSwiper={ swiper => {
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
                    popularMV &&
                    popularMV.slice(0, 10).map((item, index) => {
                        return (
                            <SwiperSlide>
                                <MovieCard3 key={index} {...item} />
                            </SwiperSlide>
                        ) 
                })}
        </Swiper>
    )
}

function TrendTV() {
    const [trendTV, setTrendTV] = React.useState([])

    React.useEffect(() => {
        const getDataTrend = async () => {
            const { data } = await tmdb.get('/trending/tv/week')
            setTrendTV(data.results)
        }

        getDataTrend()
    }, [])

    return (
        <Swiper
            modules={[Navigation, Lazy]}
            style={{
                "--swiper-navigation-color": "#fff",
            }}
            spaceBetween={15}
            slidesPerView={2}
            navigation
            centeredSlides
            centeredSlidesBounds
            onSwiper={ swiper => {
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
                    trendTV &&
                    trendTV.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <MovieCard {...item} />
                            </SwiperSlide>
                        )
                })}
        </Swiper>
    )
}

function PopularTV() {
    const [PopularTV, setPopularTV] = React.useState([])
    const [trailerSeries, setTrailerSeries] = React.useState([])

    React.useEffect(() => {
        const getDataTrend = async () => {
            const { data } = await tmdb.get('/tv/popular', {
                params: {
                    append_to_response: 'videos'
                }
            })

            setPopularTV(data.results[0])
        }

        getDataTrend()
    }, [])

    
    React.useEffect(() => {
        const getDataTrailerSeries = async() => {
            const {data} = await tmdb.get(`/tv/${119051}/videos`, {
                params: {
                    append_to_response: 'videos'
                }
            })

            setTrailerSeries(data.results[Math.floor(Math.random() * 9) + 0])
        }

        getDataTrailerSeries()
    }, [])
    
    return (
        PopularTV &&
        <MovieCard2 {...PopularTV} key_trailer={trailerSeries.key}/>
    )
}

export {TrendMV, UpcomingMV, NowPlayMV, PopularMV, TrendTV, PopularTV}
