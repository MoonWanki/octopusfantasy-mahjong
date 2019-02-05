import axios from 'axios'

const SERVER_URL = 'http://localhost:4000'

export const getProfile = () => axios({
    method: 'GET',
    baseURL: SERVER_URL,
    url: '/oauth/profile',
    withCredentials: true,
})

export const signOut = () => axios({
    method: 'GET',
    baseURL: SERVER_URL,
    url: '/oauth/signout',
    withCredentials: true,
})