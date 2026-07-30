const { StatusCodes } = require('http-status-codes');
const { flightService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');

/**
 * post flight
 * request body { ... }
 */
async function createFlight(req, res) {
    try {
        const response = await flightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
        return res
                .status(StatusCodes.CREATED)
                .json(new SuccessResponse(response, 'successfully created flight'));
    } catch (error) {
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error.explanation || error.message, error.message || 'Something went wrong while creating flight'));
    }
}

async function getAllFlights(req, res) {
    try {
        const flights = await flightService.getAllFlights(req.query);
        return res
                .status(StatusCodes.OK)
                .json(new SuccessResponse(flights, 'successfully fetched flights'));
    } catch (error) {
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error.explanation || error.message, error.message || 'Cannot fetch flights'));
    }
}

async function getFlight(req, res) {
    try {
        const response = await flightService.getFlight(req.params.id);
        return res
                .status(StatusCodes.OK)
                .json(new SuccessResponse(response, 'successfully fetched the flight details'));
    } catch (error) {
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error.explanation || error.message, error.message || 'Cannot fetch flight details'));
    }
}

async function updateSeats(req, res) {
    try {
        const response = await flightService.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats,
            dec: req.body.dec 
        });
        return res
                .status(StatusCodes.OK)
                .json(new SuccessResponse(response, 'successfully updated flight seats'));
    } catch (error) {
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(new ErrorResponse(error.explanation || error.message, error.message || 'Cannot update flight seats'));
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
};