import axios from 'axios'

const cleApi = import.meta.env.VITE_RAPIDAPI_KEY

const apiClient = axios.create({
  baseURL: 'https://the-sneaker-database.p.rapidapi.com',
  timeout: 10000,
  headers: {
    'x-rapidapi-key': cleApi || '',
    'x-rapidapi-host': 'the-sneaker-database.p.rapidapi.com'
  }
})

export default apiClient
