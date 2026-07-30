const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require('../utils/common');

function validateCreateRequest(req, res, next) {
    if(!req.body.flightNumber) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(
                    'flightNumber not found in the incoming request in the correct form',
                    'Something went wrong while creating flight'
                ));
    }
    if(!req.body.airplaneId) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(
                    'airplaneId not found in the incoming request in the correct form',
                    'Something went wrong while creating flight'
                ));
    }
    if(!req.body.departureAirportId) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(
                    'departureAirportId not found in the incoming request in the correct form',
                    'Something went wrong while creating flight'
                ));
    }
    if(!req.body.arrivalAirportId) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(
                    'arrivalAirportId not found in the incoming request in the correct form',
                    'Something went wrong while creating flight'
                ));
    }
    if(!req.body.arrivalTime) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(
                    'arrivalTime not found in the incoming request in the correct form',
                    'Something went wrong while creating flight'
                ));
    }
    if(!req.body.departureTime) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(
                    'departureTime not found in the incoming request in the correct form',
                    'Something went wrong while creating flight'
                ));
    }
    if(!req.body.price) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(
                    'price not found in the incoming request in the correct form',
                    'Something went wrong while creating flight'
                ));
    }
    if(!req.body.totalSeats) {
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(new ErrorResponse(
                    'totalSeats not found in the incoming request in the correct form',
                    'Something went wrong while creating flight'
                ));
    }

    next();
}

module.exports = {
    validateCreateRequest
};
