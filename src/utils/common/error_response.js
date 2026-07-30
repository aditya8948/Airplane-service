class ErrorResponse {
    constructor(error = {}, message = 'something went wrong') {
        this.success = false;
        this.message = message;
        this.data = {};
        this.error = error;
    }
}

module.exports = ErrorResponse;