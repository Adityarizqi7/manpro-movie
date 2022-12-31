import React from 'react'
import { Link } from 'react-router-dom'

import nevrays from '@/assets/images/nevrays.png'
import ftlogo from '@/assets/images/footer-bg.jpg'

export default function Footer() {
    return (
        <footer
            className='montserrat bg-white bg-cover bg-no-repeat p-4 text-white sm:p-12'
            style={{ backgroundImage: `url(${ftlogo})` }}
        >
            <div className='md:flex md:justify-between'>
                <div className='mb-6 md:mb-0'>
                    <Link to='/' className='flex items-center'>
                        <img
                            width='auto'
                            height='auto'
                            src={nevrays}
                            loading='lazy'
                            alt='Nevrays Logo'
                            className='h-12 w-12'
                        />
                        <span className='self-center whitespace-nowrap text-[1.75rem] font-semibold'>
                            Nevrays
                        </span>
                    </Link>
                </div>
                <div className='grid grid-cols-2 gap-8 sm:grid-cols-2 sm:gap-20 5xs:grid-cols-1'>
                    <div>
                        <h3 className='mb-6 text-sm font-semibold uppercase'>
                            Resources
                        </h3>
                        <ul>
                            <li className='mb-4'>
                                <a
                                    href='https://www.themoviedb.org/documentation/api'
                                    target='_blank'
                                    className='text-gray-200 hover:underline'
                                >
                                    The Movie DB
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='mb-6 text-sm font-semibold uppercase '>
                            Legal
                        </h3>
                        <ul>
                            <li className='mb-4'>
                                <Link
                                    to='/privacy-policy'
                                    target='_blank'
                                    className='text-gray-200 hover:underline'
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/terms-of-use'
                                    target='_blank'
                                    rel='nofollow'
                                    className='text-gray-200 hover:underline'
                                >
                                    Terms of Use
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className='my-6 border-gray-200 sm:mx-auto lg:my-8' />
            <div className='flex items-center'>
                <span className='text-sm text-gray-200 sm:text-center'>
                    © 2022{' '}
                    <Link to='/' className='hover:underline'>
                        Netray
                    </Link>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    )
}
