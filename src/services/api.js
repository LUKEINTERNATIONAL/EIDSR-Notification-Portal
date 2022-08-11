import axios from "axios"
import store from '../store'

export default () => {
    return axios.create ({
        baseURL: 'http://192.168.11.175:8186',
        headers: {
            Authorization: `Bearer ${store.state.token}`
        }
    })
}