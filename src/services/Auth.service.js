import Api from '../services/Api'


export const authService = {
    login,
    logout
}

const login = (payload) => {
    return Api.post('/login', payload)
        .then(result => {
            setAuthDataSaved(result.data)

            return result
        })
}

const setAuthDataSaved = (data) => {
    let manipulate = {
        token: data.token,
        ...data.user
    }

    localStorage.setItem('data', JSON.stringify(manipulate))
}

const logout = () => {
    localStorage.removeItem('data')
}


