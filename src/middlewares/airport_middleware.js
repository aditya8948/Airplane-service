const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require('../utils/common');

function validateCreateRequest(req, res, next) {
    if(!req.body.name) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(
                    'Airport name not found in the incoming request in the correct form',
                    'Something went wrong while creating airport'
                ));
    }
    if(!req.body.code) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(
                    'Airport code not found in the incoming request in the correct form',
                    'Something went wrong while creating airport'
                ));
    }
    if(!req.body.cityId) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(
                    'Airport cityId not found in the incoming request in the correct form',
                    'Something went wrong while creating airport'
                ));
    }
    next();
}

module.exports = {
    validateCreateRequest
};