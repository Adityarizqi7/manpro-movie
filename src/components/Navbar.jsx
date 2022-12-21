// import React from 'react'
import tmdb from '@/api/tmbd'
import { useLocation } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom'
import React, { useState, Fragment } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { Menu, Transition, Dialog } from '@headlessui/react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import '@/styles/component/_navbar.scss'
import netray from '@/assets/images/netray.png'
import DarkBtn from '@/components/button/DarkBtn'

export default function Navbar() {
    const inputRef = React.useRef()
    const [loading, setLoading] = React.useState(false)

    const [searchMovie, setSearchMovie] = React.useState('')
    const [searchResult, setSearchResult] = React.useState([])
    const [searchTempValue, setSearchTempValue] = React.useState([])

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenNavbar, setIsOpenNavbar] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    const activeStyle = { color: 'white' }

    const location = useLocation()
    function checkPathMovies() {
        if (
            location.pathname === '/movies/now-playing' ||
            location.pathname === '/movies/upcoming' ||
            location.pathname === '/movies/popular'
        )
            return 'text-white'
        return 'text-gray-300'
    }
    function checkPathSeries() {
        if (
            location.pathname === '/series/airing-today' ||
            location.pathname === '/series/on-the-air' ||
            location.pathname === '/series/top-rated'
        )
            return 'text-white'
        return 'text-gray-300'
    }

    const handleChange = (e) => setSearchMovie(e.target.value)
    const handleSubmitSearch = async (e) => {
        e.preventDefault()
        setLoading(true)

        setSearchTempValue((current) => [inputRef.current.value, ...current])

        try {
            const { data, status } = await tmdb.get('/search/multi', {
                params: {
                    query: inputRef.current.value,
                },
            })
            status === 200 && setSearchResult(data.results)
            setLoading(false)
        } catch {
            setLoading(false)
        }
    }

    const deleteText = () => setSearchMovie('')
    const handleFocusInput = React.useCallback((event) => {
        if ((event.ctrlKey || event.metaKey) && event.code === 'KeyM') {
            event.preventDefault()
            setIsOpen(true)
        } else if (event.key === 'Delete') {
            event.preventDefault()
            setSearchMovie('')
        }
    }, [])

    React.useEffect(() => {
        document.addEventListener('keydown', handleFocusInput)

        return () => {
            document.removeEventListener('keydown', handleFocusInput)
        }
    }, [handleFocusInput])

    return (
        <header className='sticky top-0 z-50 w-full bg-gray-800 shadow'>
            <div className='montserrat flex h-[4.5rem] items-center justify-between'>
                <div className='flex items-center gap-6'>
                    <div>
                        <Link to={'/'}>
                            <img
                                className='h-12 w-12'
                                src={netray}
                                alt='Netray Logo'
                            />
                        </Link>
                    </div>
                    <div className='hidden items-center md:block'>
                        <div className='ml-0 space-x-4'>
                            <NavLink
                                to='/'
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                                className='rounded-md px-3 py-2 text-[1rem] font-medium text-gray-300 hover:bg-gray-700'
                            >
                                Home
                            </NavLink>

                            {/* Movies Menu Item */}
                            <Menu>
                                <Menu.Button
                                    className={`ui-open:bg-gray-700 ui-open:text-white ${checkPathMovies()} rounded-md px-3 py-2 text-[1rem] font-medium hover:bg-gray-700 hover:text-white`}
                                >
                                    <div className='flex items-center gap-2'>
                                        <span>Movies</span>
                                        <ChevronDownIcon className='h-4 w-4' />
                                    </div>
                                </Menu.Button>
                                <Transition
                                    enter='transition-transform duration-100 ease-out'
                                    enterFrom='transform scale-95 opacity-0'
                                    enterTo='transform scale-100 opacity-100'
                                    leave='transition duration-100 ease-out'
                                    leaveFrom='transform scale-100 opacity-100'
                                    leaveTo='transform scale-95 opacity-0'
                                    className='absolute left-[10.15rem] top-[4rem]'
                                >
                                    <Menu.Items
                                        className={
                                            'shadow-own flex flex-col rounded-[5px] bg-white py-1'
                                        }
                                    >
                                        <Menu.Item>
                                            {({ active }) => (
                                                <NavLink
                                                    className={`${
                                                        active
                                                            ? 'bg-blue-600/50 text-white'
                                                            : 'bg-white text-black'
                                                    } py-2 px-6`}
                                                    to='/movies/upcoming'
                                                >
                                                    Upcoming
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <NavLink
                                                    className={`${
                                                        active
                                                            ? 'bg-blue-600/50 text-white'
                                                            : 'bg-white text-black'
                                                    } py-2 px-6`}
                                                    to='/movies/now-playing'
                                                >
                                                    Now Playing
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <NavLink
                                                    className={`${
                                                        active
                                                            ? 'bg-blue-600/50 text-white'
                                                            : 'bg-white text-black'
                                                    } py-2 px-6`}
                                                    to='/movies/popular'
                                                >
                                                    Popular
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            <Menu>
                                <Menu.Button
                                    className={`ui-open:bg-gray-700 ui-open:text-white ${checkPathSeries()} rounded-md px-3 py-2 text-[1rem] font-medium hover:bg-gray-700 hover:text-white`}
                                >
                                    <div className='flex items-center gap-2'>
                                        <span>TV Series</span>
                                        <ChevronDownIcon className='h-4 w-4' />
                                    </div>
                                </Menu.Button>
                                <Transition
                                    enter='transition-transform duration-100 ease-out'
                                    enterFrom='transform scale-95 opacity-0'
                                    enterTo='transform scale-100 opacity-100'
                                    leave='transition duration-100 ease-out'
                                    leaveFrom='transform scale-100 opacity-100'
                                    leaveTo='transform scale-95 opacity-0'
                                    className='absolute left-[18.30rem] top-[4rem]'
                                >
                                    <Menu.Items
                                        className={
                                            'shadow-own flex flex-col rounded-[5px] bg-white py-1'
                                        }
                                    >
                                        <Menu.Item>
                                            {({ active }) => (
                                                <NavLink
                                                    className={`${
                                                        active
                                                            ? 'bg-blue-600/50 text-white'
                                                            : 'bg-white text-black'
                                                    } py-2 px-6`}
                                                    to='/series/airing-today'
                                                >
                                                    Airing Today
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <NavLink
                                                    className={`${
                                                        active
                                                            ? 'bg-blue-600/50 text-white'
                                                            : 'bg-white text-black'
                                                    } py-2 px-6`}
                                                    to='/series/on-the-air'
                                                >
                                                    On TV
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <NavLink
                                                    className={`${
                                                        active
                                                            ? 'bg-blue-600/50 text-white'
                                                            : 'bg-white text-black'
                                                    } py-2 px-6`}
                                                    to='/series/top-rated'
                                                >
                                                    Top Rated
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <button className={
                            `cursor-pointer bg-gray-700/70 p-3 rounded-lg xl:w-[20vw] border border-gray-600/80`
                        } 
                        type="button"
                        onClick={openModal}
                    >   
                        <div className="flex items-center gap-3">
                            <MagnifyingGlassIcon className='w-5 text-gray-500' />
                            <h1 className='text-gray-400 5xs:hidden text-sm'>Quick Search....</h1>
                            <h1
                                className={`text-[14px] 2xs:hidden font-semibold text-gray-400 ml-auto`}
                            >
                                Ctrl M
                            </h1>
                        </div>
                    </button>
                    <DarkBtn className='2xs:hidden' />
                </div>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="container-dialog relative z-50" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <div className="overlay-bg-modal fixed inset-0 bg-black bg-opacity-10" />
                        </Transition.Child>

                        <div className='fixed inset-0 overflow-y-auto'>
                            <div className='flex min-h-full items-center justify-center p-4 text-center'>
                                <Transition.Child
                                    as={Fragment}
                                    enter='ease-out duration-300'
                                    enterFrom='opacity-0 scale-95'
                                    enterTo='opacity-100 scale-100'
                                    leave='ease-in duration-200'
                                    leaveFrom='opacity-100 scale-100'
                                    leaveTo='opacity-0 scale-95'
                                >
                                    <Dialog.Panel className='shadow-own w-full max-w-2xl transform rounded-2xl bg-white p-6 text-left align-middle transition-all 4xs:px-3'>
                                        <div className='search-movies montserrat relative'>
                                            <form
                                                onSubmit={handleSubmitSearch}
                                                className='box-search flex items-center border-b border-gray-300 pb-4'
                                            >
                                                <MagnifyingGlassIcon className='h-6 w-6 text-gray-500' />
                                                <div className='form-control w-full'>
                                                    <input
                                                        type='text'
                                                        name='title'
                                                        autoComplete='off'
                                                        className={`w-full pr-[3rem] pl-[0.75rem] focus:outline-none`}
                                                        placeholder='Cari movie dan series ...'
                                                        onChange={handleChange}
                                                        ref={inputRef}
                                                        value={searchMovie}
                                                    />
                                                    {
                                                        <>
                                                            <kbd
                                                                onClick={closeModal}
                                                                className='montserrat absolute right-0 top-[-0.2rem] hidden cursor-pointer rounded-lg border border-gray-200 px-2 py-1.5 text-xs font-semibold text-gray-800 sm:block'
                                                            >
                                                                Esc
                                                            </kbd>
                                                            <kbd
                                                                onClick={
                                                                    deleteText
                                                                }
                                                                className='montserrat absolute right-0 top-[-0.2rem] block cursor-pointer rounded-lg border border-gray-200 px-2 py-1.5 text-xs font-semibold text-gray-800 sm:hidden'
                                                            >
                                                                Del
                                                            </kbd>
                                                        </>
                                                    }
                                                </div>
                                            </form>
                                            <div className="box-result-search overflow-y-auto 2xs:h-[100vw] h-[28vw] space-y-10">
                                                {  
                                                    searchResult.length < 1 ? 
                                                        <div className="movies-result my-5 montserrat space-y-3 h-[14vw] pr-4 overflow-y-auto">
                                                            <h1 className='font-semibold text-[1.25rem]'>Tidak ada pencarian</h1>
                                                            {/* <div className="search-value-temp">
                                                                {
                                                                    searchTempValue?.map((e, idx) => {
                                                                        return (
                                                                            <div key={idx} className="box-item-result flex items-center justify-between cursor-pointer p-4 border-t border-gray-300/30 hover:bg-blue-50/50 hover:text-gray-900">
                                                                                <div className="highlight-info-result flex items-center gap-3 font-medium text-md">
                                                                                    <h2>{e}</h2>
                                                                                </div>
                                                                                <ChevronRightIcon className='w-3 h-3' />
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div> */}
                                                        </div>
                                                    :  
                                                    <>
                                                        <div className="movies-result my-5 montserrat space-y-3 2xs:h-[50vw] h-[14vw] pr-4 overflow-y-auto">
                                                            <h1 className='font-semibold text-[1.25rem]'>Movies</h1>
                                                            <div className="results flex flex-col gap-2">
                                                                {
                                                                    searchResult.map((e, idx) => {
                                                                        return (
                                                                            e.media_type === 'movie' &&  (
                                                                                <a key={idx} href={`/movie/${e.id}`}>
                                                                                    <div className="box-item-result flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-md hover:bg-blue-500 hover:text-white">
                                                                                        <div className="highlight-info-result flex items-center gap-3">
                                                                                            <img src={`https://www.themoviedb.org/t/p/w500/${e.poster_path}`} alt={e.title} className='w-6 aspect-square rounded-full object-cover' />
                                                                                            <h2>{e.title}</h2>
                                                                                        </div>
                                                                                        <ChevronRightIcon className='w-3 h-3' />
                                                                                    </div>
                                                                                </a>
                                                                            )
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="series-result my-5 montserrat space-y-3 2xs:h-[50vw] h-[14vw] pr-4 overflow-y-auto">
                                                            <h1 className='font-semibold text-[1.25rem]'>Series / TV Show</h1>
                                                            <div className="results flex flex-col gap-2">
                                                                {
                                                                    searchResult.map((e, idx) => {
                                                                        return (
                                                                            e.media_type === 'tv' &&  (
                                                                                <a key={idx} href={e.id}>
                                                                                    <div className="box-item-result flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-md hover:bg-blue-500 hover:text-white">
                                                                                        <div className="highlight-info-result flex items-center gap-3">
                                                                                            <img src={`https://www.themoviedb.org/t/p/w500/${e.poster_path}`} alt={e.name} className='w-6 aspect-square rounded-full object-cover' />
                                                                                            <h2>{e.name}</h2>
                                                                                        </div>
                                                                                        <ChevronRightIcon className='w-3 h-3' />
                                                                                    </div>
                                                                                </a>
                                                                            )
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <div className='-mr-2 flex 2xs:gap-2 md:hidden'>
                    <DarkBtn className='hidden 2xs:block' />
                    <button
                        onClick={() => setIsOpenNavbar(!isOpenNavbar)}
                        type='button'
                        className='inline-flex items-center justify-center rounded-md text-gray-100 focus:outline-none'
                        aria-controls='mobile-menu'
                        aria-expanded='false'
                    >
                        <span className='sr-only'>Open main menu</span>
                        {!isOpenNavbar ? (
                            <svg
                                className='block h-6 w-6'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                aria-hidden='true'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M4 6h16M4 12h16M4 18h16'
                                />
                            </svg>
                        ) : (
                            <svg
                                className='block h-6 w-6'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                aria-hidden='true'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Navbar */}
            <Transition
                show={isOpenNavbar}
                enter='transition ease-out duration-100 transform'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='transition ease-in duration-75 transform'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
            >
                <div className='montserrat md:hidden' id='mobile-menu'>
                    <div className='space-y-1 pt-2 pb-3'>
                        <NavLink
                            to='/'
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                            className='text-ba[1rem] block py-4 font-medium text-gray-300'
                        >
                            Home
                        </NavLink>
                        <Menu>
                            <Menu.Button
                                className={`ui-open:rounded-md ui-open:bg-gray-700 ui-open:px-2 ui-open:text-white ${checkPathMovies()} block w-full py-4 text-[1rem] font-medium text-gray-300`}
                            >
                                <div className='flex items-center justify-between gap-2'>
                                    <span>Movies</span>
                                    <ChevronDownIcon className='h-4 w-4' />
                                </div>
                            </Menu.Button>
                            <Transition
                                enter='transition-transform duration-100 ease-out'
                                enterFrom='transform scale-95 opacity-0'
                                enterTo='transform scale-100 opacity-100'
                                leave='transition duration-100 ease-out'
                                leaveFrom='transform scale-100 opacity-100'
                                leaveTo='transform scale-95 opacity-0'
                            >
                                <Menu.Items
                                    className={
                                        'shadow-own mt-2 flex flex-col rounded-[5px] bg-white py-1'
                                    }
                                >
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                                className={`${
                                                    active
                                                        ? 'bg-blue-600/50 text-white'
                                                        : 'bg-white text-black'
                                                } py-2 px-6`}
                                                to='/movies/upcoming'
                                            >
                                                Upcoming
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                                className={`${
                                                    active
                                                        ? 'bg-blue-600/50 text-white'
                                                        : 'bg-white text-black'
                                                } py-2 px-6`}
                                                to='/movies/now-playing'
                                            >
                                                Now Playing
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                                className={`${
                                                    active
                                                        ? 'bg-blue-600/50 text-white'
                                                        : 'bg-white text-black'
                                                } py-2 px-6`}
                                                to='/movies/popular'
                                            >
                                                Popular
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        <Menu>
                            <Menu.Button
                                className={`ui-open:rounded-md ui-open:bg-gray-700 ui-open:px-2 ui-open:text-white ${checkPathSeries()}  block w-full py-4 text-[1rem] font-medium text-gray-300`}
                            >
                                <div className='flex items-center justify-between gap-2'>
                                    <span>TV Series</span>
                                    <ChevronDownIcon className='h-4 w-4' />
                                </div>
                            </Menu.Button>
                            <Transition
                                enter='transition-transform duration-100 ease-out'
                                enterFrom='transform scale-95 opacity-0'
                                enterTo='transform scale-100 opacity-100'
                                leave='transition duration-100 ease-out'
                                leaveFrom='transform scale-100 opacity-100'
                                leaveTo='transform scale-95 opacity-0'
                            >
                                <Menu.Items
                                    className={
                                        'shadow-own mt-2 flex flex-col rounded-[5px] bg-white py-1'
                                    }
                                >
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                                className={`${
                                                    active
                                                        ? 'bg-blue-600/50 text-white'
                                                        : 'bg-white text-black'
                                                } py-2 px-6`}
                                                to='/series/airing-today'
                                            >
                                                Airing Today
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                                className={`${
                                                    active
                                                        ? 'bg-blue-600/50 text-white'
                                                        : 'bg-white text-black'
                                                } py-2 px-6`}
                                                to='/series/on-the-air'
                                            >
                                                On TV
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                                className={`${
                                                    active
                                                        ? 'bg-blue-600/50 text-white'
                                                        : 'bg-white text-black'
                                                } py-2 px-6`}
                                                to='/series/top-rated'
                                            >
                                                Top Rated
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </Transition>
        </header>
    )
}
