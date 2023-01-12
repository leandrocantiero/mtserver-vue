import axios from 'axios'

const success = res => res

const error = err => {
    if (err.response && err.response.status === 401) {
        window.location.href = '/'
    } else {
        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error)

axios.timeout = 1000