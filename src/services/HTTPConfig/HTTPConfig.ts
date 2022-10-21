import axios from 'axios'

export const API_URL = "https://test2.sionic.ru/api/" //api url

const api = axios.create({
    baseURL: API_URL
})

export default api;