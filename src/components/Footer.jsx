import React from 'react'

import netray from '@/assets/images/netray.png'
import ftlogo from '@/assets/images/footer-bg.jpg'

export default function Footer() {
    return (
        <footer className='montserrat bg-white p-4 sm:p-12 bg-no-repeat bg-cover text-white' style={{backgroundImage: `url(${ftlogo})`}}>
            <div className='md:flex md:justify-between'>
                <div className='mb-6 md:mb-0'>
                    <a href='/' target='_blank' className='flex items-center'>
                        <img
                            className='h-12 w-12'
                            src={netray}
                            alt='Netray Logo'
                        />
                        <span className='self-center whitespace-nowrap text-[1.75rem] font-semibold'>
                            Netray
                        </span>
                    </a>
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
                            <li className="mb-4">
                                <a href="/privacy-policy" target="_blank" className="text-gray-600 hover:underline dark:text-gray-400">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/privacy" target="_blank" rel="nofollow" className="text-gray-600 hover:underline dark:text-gray-400">Terms & Condition</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className='my-6 border-gray-200 sm:mx-auto lg:my-8' />
            <div className='flex items-center'>
                <span className='text-sm text-gray-200 sm:text-center'>
                    © 2022{' '}
                    <a href='/' target='_blank' className='hover:underline'>
                        Netray
                    </a>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    )
}
