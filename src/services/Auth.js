import Api from "./Api"
import Cookies from "js-cookie"

const login = (payload) => {
    return Api.post("/login", payload)
        .then(response => {
            setAuthCookies(response.data)

            return response
        })
}

const setAuthCookies = (data) => {
    const expires_in = 86400 // 24 hours
    const config = { expires: expires_in / 60 / 60 / 24 }
    const user = data.user

    if (window.localStorage) {
        localStorage.setItem("data", JSON.stringify({ token: data.token, ...user }))
    }

    Cookies.set("access_token", data.token, config)
    Cookies.set("user_id", user.user_id, config)
    Cookies.set("email", user.user_email, config)
    Cookies.set("role_id", user.user_role_id, config)
    Cookies.set("name", user.user_name, config)
    Cookies.set("phone", user.user_phone, config)
    Cookies.set("gender", user.user_gender, config)
}

const clearAuthCookies = () => {
    localStorage.removeItem("data")

    Cookies.remove("access_token")
    Cookies.remove("user_id")
    Cookies.remove("email")
    Cookies.remove("role_id")
    Cookies.remove("name")
    Cookies.remove("phone")
    Cookies.remove("gender")
}

const register = (payload) => {
    return Api.post('/register/init', payload)
}

const validation = (payload) => {
    return Api.post('/register/verify', payload)
}

const biodata = (payload) => {
    return Api.post(`/register/detail/${payload.id}`, payload)
}

const Auth = {
    login,
    clearAuthCookies,
    register,
    validation,
    biodata
}

export default Auth
