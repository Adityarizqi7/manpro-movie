import axios from 'axios'
import {useState, useEffect, useCallback} from 'react'

const Test = () => {
    const [fetchedData, setFetchedData] = useState('')
    const getData = useCallback(async () => {
        const res = await axios.get(BASE_API_URL('/movie/popular'))

    }, [])

    useEffect(() => {

    }, [])

    return (
        <div>
            <button>
                test...
            </button>
        </div>
    )
}