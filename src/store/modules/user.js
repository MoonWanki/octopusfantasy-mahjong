import { createAction, handleActions } from 'redux-actions'
import { getProfile } from 'utils/api'

const initialState = {
    isSignedIn: false,
    isPending: true,
    profile: null,
};

const FETCH_USER = 'user/FETCH_USER'
const FETCH_USER_PENDING = 'user/FETCH_USER_PENDING'
const FETCH_USER_FULFILLED = 'user/FETCH_USER_FULFILLED'
const FETCH_USER_REJECTED = 'user/FETCH_USER_REJECTED'

export const fetchUser = createAction(FETCH_USER, () => getProfile())

export default handleActions({
    [FETCH_USER_PENDING]: state => {
        return {
            ...state,
            isPending: true,
        }
    },
    [FETCH_USER_FULFILLED]: (state, { payload }) => {
        const success = payload.status===200
        return {
            ...state,
            isPending: false,
            isSignedIn: success,
            profile: success ? payload.data : null
        }
    },
    [FETCH_USER_REJECTED]: state => {
        return {
            ...state,
            isPending: false,
            isSignedIn: false,
            profile: null,
        }
    },
}, initialState)

