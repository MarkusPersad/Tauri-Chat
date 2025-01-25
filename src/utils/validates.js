import { CONSTANTS } from '../constants'

export const isPassword = (value) => {
    if (typeof value !== 'string') {
        return false
    }
    return CONSTANTS.PASSWORD_REGEX.test(value)
}

export const isUserName = (value) => {
    if (typeof value !== 'string') {
        return false
    }
    return value.length >= 8 && value.length <= 32
}
