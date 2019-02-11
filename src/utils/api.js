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

export const signUpToMahjong = nickname => axios({
    method: 'POST',
    data: { nickname },
    baseURL: process.env.REACT_APP_SERVER_URL,
    url: '/mahjong/player',
    withCredentials: true,
})