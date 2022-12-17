// import React from 'react'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'

import '@/styles/component/_navbar.scss'
import netray from '@/assets/images/netray.png'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false)
    let activeStyle = {
        color: 'white',
    }
    
    let location = useLocation()
    function checkPath(...path) {
        for (let i = 0; i <= path.length; i++) {
            return path[i] === location.pathname ? 'text-white' : 'text-gray-300'
        }
    }

    return (
        <header className='sticky top-0 z-50 w-full bg-gray-800 shadow'>
            <div className='flex h-[4.5rem] items-center justify-between montserrat'>
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
                            <Menu>
                                <Menu.Button className={`ui-open:bg-gray-700 ui-open:text-white ${checkPath('/movies/upcoming', '/movies/now-playing', '/movies/popular')} rounded-md px-3 py-2 text-[1rem] font-medium hover:bg-gray-700 hover:text-white`}>
                                    <div className='flex items-center gap-2'>
                                        <span>Movies</span>
                                        <ChevronDownIcon className='w-4 h-4' />
                                    </div>
                                </Menu.Button>
                                <Transition
                                    enter="transition-transform duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-100 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                    className='absolute left-[9.25rem] top-[4rem]'
                                >
                                    <Menu.Items className={'flex flex-col py-1 bg-white shadow-own rounded-[5px]'}>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <NavLink
                                                    className={`${
                                                        active ? 'bg-blue-600/50 text-white' : 'bg-white text-black'
                                                    } py-2 px-6`}
                                                    to="/movies/upcoming"
                                                >
                                                    Upcoming
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <NavLink
                                                    className={`${
                                                        active ? 'bg-blue-600/50 text-white' : 'bg-white text-black'
                                                    } py-2 px-6`}
                                                    to="/movies/now-playing"
                                                >
                                                    Now Playing
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <NavLink
                                                    className={`${
                                                        active ? 'bg-blue-600/50 text-white' : 'bg-white text-black'
                                                    } py-2 px-6`}
                                                    to="/movies/popular"
                                                >
                                                    Popular
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>                                        
                                </Transition>
                            </Menu>
                            <Menu>
                                <Menu.Button className={`ui-open:bg-gray-700 ui-open:text-white ${checkPath('/series/airing-today', '/series/top-rated', '/series/on-the-air')} rounded-md px-3 py-2 text-[1rem] font-medium hover:bg-gray-700 hover:text-white`}>
                                    <div className='flex items-center gap-2'>
                                        <span>TV Series</span>
                                        <ChevronDownIcon className='w-4 h-4' />
                                    </div>
                                </Menu.Button>
                                <Transition
                                    enter="transition-transform duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-100 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                    className='absolute left-[15rem] top-[4rem]'
                                >
                                    <Menu.Items className={'flex flex-col py-1 bg-white shadow-own rounded-[5px]'}>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <NavLink
                                                    className={`${
                                                        active ? 'bg-blue-600/50 text-white' : 'bg-white text-black'
                                                    } py-2 px-6`}
                                                    to="/series/airing-today"
                                                >
                                                    Airing Today
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <NavLink
                                                    className={`${
                                                        active ? 'bg-blue-600/50 text-white' : 'bg-white text-black'
                                                    } py-2 px-6`}
                                                    to="/series/on-the-air"
                                                >
                                                    On TV
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <NavLink
                                                    className={`${
                                                        active ? 'bg-blue-600/50 text-white' : 'bg-white text-black'
                                                    } py-2 px-6`}
                                                    to="/series/top-rated"
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
                <div className='-mr-2 flex md:hidden'>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type='button'
                        className='inline-flex items-center justify-center rounded-md text-gray-400 focus:outline-none'
                        aria-controls='mobile-menu'
                        aria-expanded='false'
                    >
                        <span className='sr-only'>Open main menu</span>
                        {!isOpen ? (
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

            <Transition
                show={isOpen}
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
                            className='block py-4 text-ba[1rem] font-medium text-gray-300'
                        >
                            Home
                        </NavLink>
                        <Menu>
                            <Menu.Button className={`ui-open:bg-gray-700 ui-open:px-2 ui-open:rounded-md ui-open:text-white ${checkPath('/movies/upcoming', '/movies/now-playing', '/movies/popular')} w-full py-4 text-[1rem] font-medium text-gray-300 block`}>
                                <div className='flex items-center gap-2 justify-between'>
                                    <span>Movies</span>
                                    <ChevronDownIcon className='w-4 h-4' />
                                </div>
                            </Menu.Button>
                            <Transition
                                enter="transition-transform duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-100 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Menu.Items className={'flex flex-col py-1 bg-white shadow-own rounded-[5px] mt-2'}>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                                className={`${
                                                    active ? 'bg-blue-600/50 text-white' : 'bg-white text-black'
                                                } py-2 px-6`}
                                                to="/movies/upcoming"
                                            >
                                                Upcoming
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                            className={`${
                                                active ? 'bg-blue-600/50 text-white' : 'bg-white text-black'
                                            } py-2 px-6`}
                                            to="/movies/now-playing"
                                            >
                                            Now Playing
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                            className={`${
                                                active ? 'bg-blue-600/50 text-white' : 'bg-white text-black'
                                            } py-2 px-6`}
                                            to="/movies/popular"
                                            >
                                                Popular
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>                                        
                            </Transition>
                        </Menu>
                        <Menu>
                            <Menu.Button className={`ui-open:bg-gray-700 ui-open:px-2 ui-open:rounded-md ui-open:text-white ${checkPath('/series/airing-today', '/series/top-rated', '/series/on-the-air')}  w-full py-4 text-[1rem] font-medium text-gray-300 block`}>
                                <div className='flex items-center gap-2 justify-between'>
                                    <span>TV Series</span>
                                    <ChevronDownIcon className='w-4 h-4' />
                                </div>
                            </Menu.Button>
                            <Transition
                                enter="transition-transform duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-100 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Menu.Items className={'flex flex-col py-1 bg-white shadow-own rounded-[5px] mt-2'}>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                                className={`${
                                                    active ? 'bg-blue-600/50 text-white' : 'bg-white text-black'
                                                } py-2 px-6`}
                                                to="/series/airing-today"
                                            >
                                                Airing Today
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                            className={`${
                                                active ? 'bg-blue-600/50 text-white' : 'bg-white text-black'
                                            } py-2 px-6`}
                                            to="/series/on-the-air"
                                            >
                                            On TV
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                            className={`${
                                                active ? 'bg-blue-600/50 text-white' : 'bg-white text-black'
                                            } py-2 px-6`}
                                            to="/series/top-rated"
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
