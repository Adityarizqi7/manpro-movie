import React from 'react'
import tmdb from '../../api/tmbd'
import Slick from 'react-slick/dist/react-slick.min.js'

import '@/assets/lib/slick/slick.min.scss'
import '@/assets/lib/slick/slick-theme.min.scss'

import {MovieCard, MovieCard2} from './MovieCard'

function TrendMV({ urlAPI }) {
    const [trendMV, setTrendMV] = React.useState([])

    const settings = {
        speed: 500,
        dots: false,
        infinite: true,
        lazyLoad: true,
        slidesToShow: 6,
        initialSlide: 0,
        centerMode: true,
        slidesToScroll: 1,
        swipeToSlide: true,
        className: 'center',
        centerPadding: '2rem',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    React.useEffect(() => {
        const getDataTrend = async () => {
            const { data } = await tmdb.get(urlAPI)
            setTrendMV(data.results)
        }

        getDataTrend()
    }, [])

    return (
        <Slick {...settings}>
            {trendMV &&
                trendMV.map((item, index) => {
                    return <MovieCard key={index} {...item} />
                })}
        </Slick>
    )
}
function TrendTV({ urlAPI }) {
    const [trendTV, setTrendTV] = React.useState([])

    const settings = {
        speed: 500,
        dots: false,
        infinite: true,
        lazyLoad: true,
        slidesToShow: 6,
        initialSlide: 0,
        centerMode: true,
        slidesToScroll: 1,
        swipeToSlide: true,
        className: 'center',
        centerPadding: '2rem',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    React.useEffect(() => {
        const getDataTrend = async () => {
            const { data } = await tmdb.get(urlAPI)
            setTrendTV(data.results)
        }

        getDataTrend()
    }, [])

    return (
        <Slick {...settings}>
            {trendTV &&
                trendTV.map((item, index) => {
                    return <MovieCard key={index} {...item} />
                })}
        </Slick>
    )
}
function PopularTV({ urlAPI }) {
    const [PopularTV, setPopularTV] = React.useState([])
    const [trailerSeries, setTrailerSeries] = React.useState([])

    const settings = {
        dots: false,
        infinite: false,
        vertical: true,
        slidesToShow: 1,
        verticalSwiping: false,
    }

    React.useEffect(() => {
        const getDataTrend = async () => {
            const { data } = await tmdb.get(urlAPI, {
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
        <Slick {...settings}>
            {
                PopularTV &&
                <MovieCard2 {...PopularTV} key_trailer={trailerSeries.key}/>
            }
        </Slick>
    )
}

export {TrendMV, TrendTV, PopularTV}
