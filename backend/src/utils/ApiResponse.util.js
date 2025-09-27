/**
 *
 * Project Name : study-buddy(backend)
 * Developer : Md Habibul Hasan
 * Developer Email : programmerhasan0@gmail.com
 * File name : ApiResponse.util.js
 * File description: This file is the blueprint for all Api Response
 * Date : 19/09/2025
 *
 */

class ApiResponse {
    constructor(res) {
        this.res = res;
    }

    setCookie(name, value) {
        this.res.cookie(name, value);
        return this;
    }

    clearCookie(name) {
        this.res.clearCookie(name);
        return this;
    }

    setToken(token) {
        this.res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24,
            path: '/',
        });
        return this;
    }
    clearToken() {
        this.res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
        });
        return this;
    }

    success(status = 200, message, type = 'response', data = {}) {
        return this.res.status(status).json({
            status,
            message,
            type,
            data,
        });
    }

    error(
        status = 500,
        message = 'Internal server error! Please contact the admin',
        type = 'error'
    ) {
        return this.res.status(status).json({
            status,
            message,
            type,
        });
    }
}

module.exports.ApiResponse = ApiResponse;
