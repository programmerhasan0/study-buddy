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
    constructor(status, message, data = {}) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
module.exports.ApiResponse = ApiResponse;
