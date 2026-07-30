class SuccessResponse {
    constructor(data = {}, message = 'successfully completed the request') {
        this.success = true;
        this.message = message;
        this.data = data;
        this.error = {};
    }
}

module.exports = SuccessResponse;