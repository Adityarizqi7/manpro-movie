// import React from 'react'
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    let activeStyle = {
        color: "white"
    };
    
    return (
        // Kerjain dibawah sini gais
        <header className="bg-gray-800 shadow w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                            className="h-8 w-8"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                            alt="Workflow"
                            />
                        </div>
                        <div className="hidden md:block flex items-center">
                            <div className="ml-10 space-x-4">
                                <NavLink to="/"
                                    style={({ isActive }) =>
                                    isActive ? activeStyle : undefined}
                                    className="hover:bg-gray-700 text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Home
                                </NavLink>
                                <NavLink to="#trending_movie" 
                                    style={({ isActive }) =>
                                    isActive ? activeStyle : undefined}
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Movies
                                </NavLink>
                                <NavLink to="#trending_tv"
                                    style={({ isActive }) =>
                                    isActive ? activeStyle : undefined}
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Series
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            ) : (
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <Transition
                show={isOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
            {(ref) => (
                <div className="md:hidden" id="mobile-menu">
                    <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink to="/"
                            style={({ isActive }) =>
                            isActive ? activeStyle : undefined}
                            className="hover:bg-gray-700 text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
                        >
                        Home
                        </NavLink>
                        <NavLink to="#trending_movie"
                            style={({ isActive }) =>
                            isActive ? activeStyle : undefined}
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                        Movies
                        </NavLink>
                        <NavLink to="#trending_tv"
                            style={({ isActive }) =>
                            isActive ? activeStyle : undefined}
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                        Series
                        </NavLink>
                    </div>
                </div>
            )}
            </Transition>
        </header>
        // <h1></h1>
    )
}
