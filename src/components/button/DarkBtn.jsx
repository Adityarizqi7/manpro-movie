import { useContext } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

import { GlobalContext } from '@/routes/Router';


export default function DarkBtn({className}) {
    
    const theme = useContext(GlobalContext).theme;
    const setTheme = useContext(GlobalContext).setTheme;

    const changeTheme = (theme) =>{
        if(theme === 'light'){
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    return(
        <div className={`${className} toggle-button__container`}>
            <div>
                <div className='relative flex items-center'>
                    <SunIcon className={`${theme === 'light' ? 'w-8' : "w-0"} sunicon transition-all text-blue-500`}/>
                    <MoonIcon className={`${theme === 'light' ? 'w-0' : "w-8"} moonicon transition-all text-blue-500`}/>
                    <input data-testid="toggle-button" className="absolute right-0 w-8 h-8 opacity-0 cursor-pointer" type="checkbox" onChange={()=>{changeTheme(theme)}}/>
                </div>
            </div>
        </div>
    )
}