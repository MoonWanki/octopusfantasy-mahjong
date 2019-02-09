import axios from 'axios'

export const getProfile = () => axios({
    method: 'GET',
    baseURL: process.env.REACT_APP_SERVER_URL,
    url: '/oauth/profile',
    withCredentials: true,
})

export const signOut = () => axios({
    method: 'GET',
    baseURL: process.env.REACT_APP_SERVER_URL,
    url: '/oauth/signout',
    withCredentials: true,
})