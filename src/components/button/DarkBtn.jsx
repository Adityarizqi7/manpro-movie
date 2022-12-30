import React, { useContext } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

import { GlobalContext } from '@/routes/Router'

export default React.memo(function DarkBtn({ className }) {
    const theme = useContext(GlobalContext).theme
    const setTheme = useContext(GlobalContext).setTheme

    const changeTheme = React.useCallback((theme) => {
        if (theme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }, [])

    return (
        <div className={`${className} toggle-button__container`}>
            <div>
                <div className='relative flex items-center'>
                    <SunIcon
                        id='sun-icon'
                        aria-label='sun-icon'
                        className={`${
                            theme === 'light' ? 'w-8' : 'w-0'
                        } sunicon text-blue-500 transition-all`}
                    />
                    <MoonIcon
                        id='moon-icon'
                        aria-label='moon-icon'
                        className={`${
                            theme === 'light' ? 'w-0' : 'w-8'
                        } moonicon text-blue-500 transition-all`}
                    />
                    <input
                        aria-label='toggle-button'
                        data-testid='toggle-button'
                        className='absolute right-0 h-8 w-8 cursor-pointer opacity-0'
                        type='checkbox'
                        onChange={() => {
                            changeTheme(theme)
                        }}
                    />
                </div>
            </div>
        </div>
    )
})