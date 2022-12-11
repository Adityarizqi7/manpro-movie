import React from 'react'

export default function Footer() {
    return (
        // Kerjain dibawah sini gais
        <footer class="p-4 bg-white sm:p-12 dark:bg-gray-800">
            <div class="md:flex md:justify-between">
                <div class="mb-6 md:mb-0">
                    <a href="/" target="_blank" class="flex items-center">
                        <img src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" class="mr-4 h-10" alt="FlowBite Logo" />
                        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Netray</span>
                    </a>
                </div>
                <div class="grid grid-cols-2 gap-8 sm:gap-20 sm:grid-cols-2">
                    <div>
                        <h3 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h3>
                        <ul>
                            <li class="mb-4">
                                <a href="https://www.themoviedb.org/documentation/api" target="_blank" class="text-gray-600 hover:underline dark:text-gray-400">The Movie DB</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                    <h3 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h3>
                        <ul>
                            <li class="mb-4">
                                <a href="/" target="_blank" class="text-gray-600 hover:underline dark:text-gray-400">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/" target="_blank" rel="nofollow" class="text-gray-600 hover:underline dark:text-gray-400">Terms & Condition</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div class="flex items-center">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="/" target="_blank" class="hover:underline">Netray</a>. All Rights Reserved.
                </span>
            </div>
        </footer>
    )
}
