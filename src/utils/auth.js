import Cookies from 'js-cookie'

const TokenKey = 'Mars-Token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token, remember) {
    if (remember) {
        return Cookies.set(TokenKey, token, {expires: 7})
    }
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
