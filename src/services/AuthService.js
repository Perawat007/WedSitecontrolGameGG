import ApiService from './ApiService'

export async function apiSignIn(data) {
    return ApiService.loginAdmin({
        url: '/login/admin',
        method: 'post',
        data,
    })
}

export async function apiSignUp(data) {
    return ApiService.loginAdmin({
        url: '/login/admin',
        method: 'post',
        data,
    })
}

export async function apiSignOut(data) {
    return ApiService.signOut({
        url: '/sign-out',
        method: 'post',
        data,
    })
}

export async function apiForgotPassword(data) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data) {
    return ApiService.loginAdmin({
        url: '/reset-password',
        method: 'post',
        data,
    })
}
