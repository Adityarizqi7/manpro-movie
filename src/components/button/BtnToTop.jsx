import React from 'react'
import { ChevronUpIcon } from '@heroicons/react/24/outline'

import '../../styles/component/button/_btntotop.scss'
import { classes } from '../../utils/Classes'

export default function BtnTopTop() {
    const [buttontotop, setButtontotop] = React.useState(false)

    const changePosition = () => {
        window.scrollY > 0 ? setButtontotop(true) : setButtontotop(buttontotop)
    }

    React.useEffect(() => {
        window.addEventListener('scroll', changePosition)

        return () => {
            window.removeEventListener('scroll', changePosition)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <ChevronUpIcon
            id='button_scroll_top'
            className={classes(
                buttontotop ? 'right-8' : '-right-20',
                'reltive text-blue-base hover:bg-blue-base fixed bottom-4 z-20 w-[1.75rem] cursor-pointer hover:rounded-full hover:p-1 hover:text-neutral-200 sm:w-10'
            )}
            onClick={() => {
                window.scroll({
                    top: 0,
                    behaviour: 'smooth',
                })
            }}
        />
    )
}
