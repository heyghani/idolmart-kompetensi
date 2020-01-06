import axios from "axios"
import Cookies from "js-cookie"
const API_URL = process.env.REACT_APP_API_URL

class Api {
    _request = (
        method,
        url,
        payload,
        config = {}
    ) => {
        const instance = axios.create({
            baseURL: API_URL
        })
            console.log(process.env)
        instance.interceptors.response.use(
            function (response) {
                return response.data
            },

            function (error) {
                if (process.env.NODE_ENV === "development") {
                    console.log(error.response)
                }

                return Promise.reject(error.response || {
                    message: error.message
                })
            }
        )
        
        const token = Cookies.get("access_token")
        const headers = {
            ...config.headers,
            "Authorization": token ? `Bearer ${token}` : "" 
        }

        return instance({
            method,
            url,
            data: method !== "get" ? payload : null,
            params: method === "get" ? payload : null,
            ...config,
            headers
        })
    }

    post(url, payload, config) {
        return this._request("post", url, payload, config)
    }

    get(url, payload, config) {
        return this._request("get", url, payload, config)
    }

    put(url, payload, config) {
        return this._request("put", url, payload, config)
    }

    delete(url, payload, config) {
        return this._request("delete", url, payload, config)
    }

    setupDefaultMethods(path) {
        return {
            get: (payload) => {
                const params = {
                    ...payload
                }

                if (payload && payload.slug) {
                    delete params.slug

                    return this.get(`/${path}/${payload.slug}`, params)
                }

                return this.get(`/${path}`, params)
            },
            create: (payload) => {
                return this.post(`/${path}`, payload)
            },
            update: (payload) => {
                const params = {
                    ...payload
                }
                delete params.slug

                return this.put(`/${path}/${payload.slug}`, payload)
            },
            delete: (slug) => {
                return this.delete(`/${path}/${slug}`)
            }
        }
    }
}

export default new Api()