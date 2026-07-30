const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require('../utils/common');

function validateCreateRequest(req, res, next) {
    if(!req.body.modelNumber) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(
                    'Airplane modelNumber not found in the incoming request in the correct form',
                    'Something went wrong while creating airplane'
                ));
    }
    if(!req.body.capacity) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(
                    'Airplane capacity not found in the incoming request in the correct form',
                    'Something went wrong while creating airplane'
                ));
    }
    next();
}

module.exports = {
    validateCreateRequest
};
