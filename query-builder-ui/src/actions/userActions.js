import { GET_USERS } from './types'
import axios from 'axios'

//CALL GET USERS API
export const getUsers = (query) => dispatch => {
    axios.get('/api/users/', {
        params: {
            query: query
        }
    })
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        })
}
