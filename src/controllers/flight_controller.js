const { StatusCodes } = require('http-status-codes');

const { flightService } = require('../services');

const { ErrorResponse, SuccessResponse } = require('../utils/common');

/**
 * post flight
 * request body {
 *             
 * }
 */

async function createFlight(req , res){
   try{
     const response = await flightService.createFlight({
        flightNumber: req.body.flightNumber,
        airplaneId: req.body.airplaneId,
        departureAirportId: req.body.departureAirportId,
        arrivalAirportId: req.body.arrivalAirportId,
        arrivalTime: req.body.arrivalTime,
        departureTime: req.body.departureTime,
        price: req.body.price,
        boardingGate: req.body.boardingGate,
        totalSeats : req.body.totalSeats,
    });
    SuccessResponse.message = 'successfully created flight';
    SuccessResponse.data = response;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch(error){
        ErrorResponse.message = error.message || 'Something went wrong while creating flight';
        ErrorResponse.error = error.explanation || error.message;
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function getAllFlights(req , res){
    try {
        const flights = await flightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.error('getAllFlights error:', error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

async function getFlight(req, res){
    try {
        const response = await flightService.getFlight(req.params.id);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
                  .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                  .json(ErrorResponse)
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
}