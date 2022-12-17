import React from 'react'
import tmdb from '@/api/tmbd'
import Skeleton from 'react-loading-skeleton'

import '@/styles/series/_toprated.scss'
import 'react-loading-skeleton/dist/skeleton.css'

import { slice } from '@/utils/Slice'
import Netray from '@/layouts/Netray'
import List from '@/components/list/List'
import { Spin } from '@/components/loading/Spin'
import { SeriesCard } from '@/components/movie/MovieCard'

export default function TopRatedSeries() {

    const inputRef = React.useRef();
    const [searchMovie, setSearchMovie] = React.useState('')
    const [focusInput, setFocusInput] = React.useState(false)

    const [topratedTVAll, setTopRatedTVAll] = React.useState([])

    const [index, setIndex] = React.useState(8)
    const [loading, setLoading] = React.useState(false)
    const initialPosts = slice(topratedTVAll, 0, index)

    const handleChange = (e) => setSearchMovie(e.target.value)
    const deleteText = () => setSearchMovie('')
    
    const handleFocusInput = React.useCallback((event) => {
        if (((event.ctrlKey || event.metaKey) && event.code === 'KeyK')) { 
            setFocusInput(true)
            event.preventDefault();
            inputRef.current.focus()
        }
        if (event.code === 'Escape') inputRef.current.blur() || deleteText()
    }, []);

    const loadMore = () => {
        setLoading(true)
        setIndex(index + 4)
        setLoading(false)
    }

    const TopratedTVAll = React.useCallback( async () => {
        try {
            setLoading(true)
            const { data, status } = await tmdb.get('/tv/top_rated')
            status === 200 && setTopRatedTVAll(data.results) 
            setLoading(false)
        } catch {
            setLoading(false)
        }
    }, [])
    
    React.useEffect(() => {

        document.addEventListener('keydown', handleFocusInput);
    
        return () => {
          document.removeEventListener('keydown', handleFocusInput);
        };
    }, [handleFocusInput]);
    
    React.useEffect(() => {
        TopratedTVAll()
    }, [TopratedTVAll])

    return (
        <Netray
            title='Top Rated Series - Netray'
            kw='top rated series, top rated series, top rated series, top rated series'
            desc='Top Rated Series - Netray. Lihat series dan TV Show yang banyak disukai.'
            ogUrl={''}
            ogType={''}
            ogTitle={''}
            ogDesc={''}
            twitTitle={''}
        >
            <main className='toprated-series-component'>
                <section id='toprated_container_series'>
                    <div className='heading-toprated-series montserrat mb-8'>
                        <h1 className='font-semibold text-black text-[2rem]'>
                            Top Rated Series
                        </h1>
                    </div>
                    <div className='search-series montserrat mb-10'>
                        <div className="box-search md:w-[35%] w-full inter relative">
                            <input type="text" name="search-movie" autoComplete='off' className={`${focusInput ? 'border-b-[rgb(72, 96, 228)]' : false} md:w-[35%] w-full pr-[3rem]`} placeholder="Cari series, TV Show yang akan datang ..." onChange={handleChange} ref={inputRef} value={searchMovie} />
                            {
                                searchMovie !== '' &&
                                <>
                                    <kbd onClick={deleteText} className="sm:block hidden px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg absolute top-[0.85rem] right-0 montserrat cursor-pointer">Esc</kbd>
                                    <kbd onClick={deleteText} className="sm:hidden block px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg absolute top-[0.85rem] right-0 montserrat cursor-pointer">Del</kbd>
                                </>
                            }
                            {
                                <h1 onClick={() => inputRef.current.focus()} className={`${
                                    searchMovie !== '' ? 'hidden' : 'block'
                                } font-semibold text-gray-400 inter text-[14px] absolute top-[1.15rem] right-0`}>Ctrl K</h1>
                            }
                        </div>
                    </div>
                    <section className='flex flex-col sm:flex-row gap-5'>
                        <List
                            title='Genres'
                            id='left-section'
                            className='list-container order-1 md:block hidden space-y-2 sm:order-2 md:w-[30%]'
                            urlAPI='/genre/movie/list'
                        />
                        <div
                            id='right_section'
                            className='section-container order-2 w-full sm:order-1 md:w-[70%]'
                        >
                            <article
                                id='movie_all'
                                className='movie-container mb-14 space-y-8'
                            >
                                {
                                    loading ? (
                                    <>
                                        <Skeleton height={300} count={4} containerClassName='flex gap-[10px]' />
                                        <Skeleton height={25} count={4} containerClassName='flex gap-[10px] mt-3' />
                                    </>
                                ) :
                                    <div className='container-list-card grid sm:grid-cols-3 grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-7'>
                                        {
                                            initialPosts.filter( value => { // eslint-disable-line array-callback-return
                                                if(searchMovie === '') return value
                                                if (value.title?.toLowerCase().includes(searchMovie?.toLowerCase().trim()) || value.original_title?.toLowerCase().includes(searchMovie?.toLowerCase().trim())) {
                                                    return value
                                                }
                                            }).map((item, index) => {
                                                return (
                                                    <SeriesCard key={index} {...item} />
                                                )
                                            })
                                        }
                                    </div>
                                }
                                {
                                    index !== 20 && 
                                    <button onClick={loadMore} className={`${loading && 'pointer-events-none'} focus:outline-none poppins text-white text-[1.125rem] bg-blue-500 hover:bg-opacity-80 transition-colors duration-300 py-3 w-full shadow-sm'`}>
                                       {
                                        loading ? 
                                            <Spin />
                                        :
                                            'load more'
                                       }
                                    </button>
                                }
                            </article>
                        </div>
                    </section>
                </section>
            </main>
        </Netray>
    )
}
