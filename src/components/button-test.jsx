/* TMDB: https://developers.themoviedb.org/3/movies/get-popular-movies */
import axios from 'axios'
import { useCallback} from 'react'
import {BASE_API_URL} from '../constant/config'

const Test = () => {
    const getData = useCallback(() => {
        axios.get(BASE_API_URL('/movie/popular')).then((res) => console.log(res.data))
    }, [])

    return (
        <button onClick={getData} className="p-4 m-4 rounded-[10px] text-white bg-blue-600">
            Munculkan film
        </button>
    )
}

export default Test