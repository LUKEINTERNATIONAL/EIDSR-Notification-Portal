import axios from "axios"

export default () => {
    return axios.create ({
        baseURL: 'http://192.168.11.43:8186'
    })
}