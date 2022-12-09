import React from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

import "../../styles/component/button/_btntotop.scss";
import {classes} from "../../utils/Classes";


export default function BtnTopTop() {

    const [buttontotop, setButtontotop] = React.useState(false);

    const changePosition = () => { window.scrollY > 0 ? setButtontotop(true) : setButtontotop(buttontotop)}
    
    React.useEffect(() => {
        window.addEventListener('scroll', changePosition);
        
        return () => {
            window.removeEventListener('scroll', changePosition);
        };
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
    return (

        <ChevronUpIcon id="button_scroll_top" className = {
            classes(buttontotop ? 'right-8': "-right-20", 'reltive z-20 sm:w-10 w-[1.75rem] text-blue-base hover:bg-blue-base hover:text-neutral-200 hover:p-1 hover:rounded-full fixed bottom-4 cursor-pointer')
            }
            onClick = {() => {
                window.scroll({
                    top: 0,
                    behaviour: "smooth",
                });
            }}
        />
    )
}