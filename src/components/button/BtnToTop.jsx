import React from 'react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'

import '../../styles/component/button/_btntotop.scss'

export default function BtnTopTop() {
    const [buttontotop, setButtontotop] = React.useState(false)

    const changePosition = React.useCallback(() => {
        window.scrollY > 0 ? setButtontotop(true) : setButtontotop(false)
    }, [])

    React.useEffect(() => {
        window.addEventListener('scroll', changePosition)

        return () => {
            window.removeEventListener('scroll', changePosition)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <ChevronUpIcon
            id='button_scroll_top'
            className={`
                ${buttontotop ? 'right-4' : '-right-20'}
                ' sm:w-10' fixed bottom-4 z-20 w-[2rem] cursor-pointer text-blue-600 hover:rounded-full hover:bg-blue-600 hover:p-1 hover:text-neutral-200
            `}
            onClick={() => {
                window.scroll({
                    top: 0,
                    behaviour: 'smooth',
                })
            }}
        />
    )
}
