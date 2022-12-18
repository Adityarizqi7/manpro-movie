import axios from 'axios'

const API_KEY = 'c6733b0d826af568ab4bfdb3b00967af'
export default axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Accept: 'application/json',
    },
    params: {
        api_key: API_KEY,
    },
})
