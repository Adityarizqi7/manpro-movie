import React from 'react'

export default function Footer() {
    return (
        // Kerjain dibawah sini gais
        <footer className="p-4 bg-white sm:p-12 montserrat">
            <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                    <a href="/" target="_blank" className="flex items-center">
                        <img src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" className="mr-4 h-10" alt="FlowBite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Netray</span>
                    </a>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-20 sm:grid-cols-2 5xs:grid-cols-1">
                    <div>
                        <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h3>
                        <ul>
                            <li className="mb-4">
                                <a href="https://www.themoviedb.org/documentation/api" target="_blank" className="text-gray-600 hover:underline dark:text-gray-400">The Movie DB</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                    <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h3>
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
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="flex items-center">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="/" target="_blank" className="hover:underline">Netray</a>. All Rights Reserved.
                </span>
            </div>
        </footer>
    )
}
